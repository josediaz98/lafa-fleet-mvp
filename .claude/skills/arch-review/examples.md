# Architecture Review Examples

Good vs bad architecture examples with code snippets. Use these as reference when writing findings and recommendations.

---

## SOLID Principle Examples

### SRP Violation — Route Handler Doing Everything

**Bad: Mixed concerns in one function**

```javascript
// routes/orders.js — SRP violation (validate + query + transform + email)
app.post('/orders', async (req, res) => {
  // Validation (concern 1)
  if (!req.body.items || !Array.isArray(req.body.items)) {
    return res.status(400).json({ error: 'Items required' });
  }
  if (!req.body.userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  // Database query (concern 2)
  const user = await db.query('SELECT * FROM users WHERE id = $1', [req.body.userId]);
  if (!user.rows[0]) return res.status(404).json({ error: 'User not found' });

  // Business logic (concern 3)
  const total = req.body.items.reduce((sum, item) => {
    const discount = user.rows[0].tier === 'gold' ? 0.9 : 1;
    return sum + item.price * item.qty * discount;
  }, 0);

  // Persistence (concern 4)
  const order = await db.query(
    'INSERT INTO orders (user_id, total, items) VALUES ($1, $2, $3) RETURNING *',
    [req.body.userId, total, JSON.stringify(req.body.items)]
  );

  // Notification (concern 5)
  await sendEmail(user.rows[0].email, 'Order Confirmed', `Total: $${total}`);

  res.json(order.rows[0]);
});
```

**Good: Separated concerns**

```javascript
// validators/orderValidator.js
function validateOrder(body) {
  if (!body.items || !Array.isArray(body.items)) throw new ValidationError('Items required');
  if (!body.userId) throw new ValidationError('User ID required');
  return { userId: body.userId, items: body.items };
}

// services/orderService.js
async function createOrder(userId, items) {
  const user = await userRepo.findById(userId);
  if (!user) throw new NotFoundError('User');
  const total = pricingService.calculateTotal(items, user.tier);
  const order = await orderRepo.create(userId, total, items);
  await notificationService.sendOrderConfirmation(user.email, total);
  return order;
}

// routes/orders.js
app.post('/orders', async (req, res, next) => {
  try {
    const { userId, items } = validateOrder(req.body);
    const order = await orderService.createOrder(userId, items);
    res.json(order);
  } catch (err) { next(err); }
});
```

---

### OCP Violation — Switch Statement on Type

**Bad: Must modify function for every new payment method**

```javascript
// paymentProcessor.js — OCP violation
function processPayment(method, amount) {
  switch (method) {
    case 'credit_card':
      return stripe.charge(amount);
    case 'paypal':
      return paypal.pay(amount);
    case 'bank_transfer':
      return bank.transfer(amount);
    case 'crypto':
      return crypto.send(amount);
    // Must add new case for every payment method
    default:
      throw new Error(`Unknown method: ${method}`);
  }
}
```

**Good: Strategy pattern — extend without modifying**

```javascript
// paymentStrategies.js
const strategies = {
  credit_card: (amount) => stripe.charge(amount),
  paypal: (amount) => paypal.pay(amount),
  bank_transfer: (amount) => bank.transfer(amount),
};

// Register new methods without touching existing code
function registerPaymentMethod(name, handler) {
  strategies[name] = handler;
}

function processPayment(method, amount) {
  const strategy = strategies[method];
  if (!strategy) throw new Error(`Unknown method: ${method}`);
  return strategy(amount);
}
```

---

### DIP Violation — Direct Instantiation

**Bad: Hard-coded dependency**

```javascript
// services/reportService.js — DIP violation
const { Pool } = require('pg');

class ReportService {
  constructor() {
    this.db = new Pool({ connectionString: process.env.DATABASE_URL }); // Hard-coded
  }

  async getMonthlyReport(month) {
    const result = await this.db.query('SELECT * FROM reports WHERE month = $1', [month]);
    return result.rows;
  }
}
```

**Good: Dependency injection**

```javascript
// services/reportService.js — DIP compliant
class ReportService {
  constructor(db) {
    this.db = db; // Injected — can be Postgres, SQLite, or mock
  }

  async getMonthlyReport(month) {
    const result = await this.db.query('SELECT * FROM reports WHERE month = $1', [month]);
    return result.rows;
  }
}

// composition root (app.js)
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const reportService = new ReportService(db);
```

---

## Design Principle Examples

### DRY Violation — Repeated Error Handling

**Bad: Identical try/catch in every handler**

```javascript
app.get('/users', async (req, res) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (err) {
    console.error('Error in GET /users:', err);
    if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await orderService.list();
    res.json(orders);
  } catch (err) {
    console.error('Error in GET /orders:', err);
    if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Same pattern repeated 20+ times...
```

**Good: Extracted error middleware**

```javascript
// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(`Error in ${req.method} ${req.path}:`, err);
  if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
  if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
  res.status(500).json({ error: 'Internal server error' });
}

// routes — clean and focused
app.get('/users', async (req, res, next) => {
  try { res.json(await userService.list()); }
  catch (err) { next(err); }
});

app.get('/orders', async (req, res, next) => {
  try { res.json(await orderService.list()); }
  catch (err) { next(err); }
});

app.use(errorHandler);
```

---

### YAGNI Violation — Premature Abstraction

**Bad: Abstract factory for a single implementation**

```javascript
// AbstractNotificationServiceFactory.js
class AbstractNotificationServiceFactory {
  createEmailService() { throw new Error('Not implemented'); }
  createSMSService() { throw new Error('Not implemented'); }
  createPushService() { throw new Error('Not implemented'); }
}

class DefaultNotificationServiceFactory extends AbstractNotificationServiceFactory {
  createEmailService() { return new SendGridEmailService(); }
  createSMSService() { return new TwilioSMSService(); }      // Never actually used
  createPushService() { return new FirebasePushService(); }   // Never actually used
}

// Usage — only email is ever used
const factory = new DefaultNotificationServiceFactory();
const emailService = factory.createEmailService();
```

**Good: Direct, simple approach**

```javascript
// notifications/email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, body) {
  await sgMail.send({ to, from: 'app@example.com', subject, text: body });
}

module.exports = { sendEmail };
```

---

### KISS Violation — Over-Engineered Event System

**Bad: Custom event bus with priority queues for a TODO app**

```javascript
// EventBus.js — for a simple TODO app
class EventBus {
  constructor() {
    this.listeners = new Map();
    this.priorityQueue = new PriorityQueue();
    this.middleware = [];
    this.deadLetterQueue = [];
    this.retryPolicy = { maxRetries: 3, backoff: 'exponential' };
  }

  use(middleware) { this.middleware.push(middleware); }
  subscribe(event, handler, priority = 0) { /* 50 lines */ }
  publish(event, data) { /* 80 lines with retry logic */ }
  replay(fromTimestamp) { /* 30 lines */ }
}

// Usage
eventBus.publish('todo:created', { text: 'Buy milk' });
eventBus.subscribe('todo:created', (todo) => todoList.push(todo));
```

**Good: Simple callback**

```javascript
// TodoApp.js
function addTodo(text) {
  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  renderTodos();
  return todo;
}
```

---

## Architecture Pattern Examples

### God Object — Utility File Dumping Ground

**Bad: 2,000-line utils.js**

```javascript
// utils.js — 2,000+ lines, imported by every file
export function formatDate(d) { /* ... */ }
export function formatCurrency(n) { /* ... */ }
export function validateEmail(s) { /* ... */ }
export function validatePhone(s) { /* ... */ }
export function hashPassword(s) { /* ... */ }
export function generateToken() { /* ... */ }
export function parseCSV(text) { /* ... */ }
export function sendSlackNotification(msg) { /* ... */ }
export function calculateTax(amount, region) { /* ... */ }
export function resizeImage(buffer, width) { /* ... */ }
// ... 150 more unrelated functions
```

**Good: Domain-specific modules**

```
utils/
├── formatting.js      ← formatDate, formatCurrency
├── validation.js      ← validateEmail, validatePhone
├── auth.js            ← hashPassword, generateToken
├── csv.js             ← parseCSV
├── notifications.js   ← sendSlackNotification
├── tax.js             ← calculateTax
└── images.js          ← resizeImage
```

---

### Circular Dependencies

**Bad: A → B → C → A**

```javascript
// userService.js
const orderService = require('./orderService'); // A → B
class UserService {
  async deleteUser(id) {
    await orderService.cancelUserOrders(id);
  }
}

// orderService.js
const paymentService = require('./paymentService'); // B → C
class OrderService {
  async cancelUserOrders(userId) {
    const orders = await this.findByUser(userId);
    for (const order of orders) await paymentService.refund(order);
  }
}

// paymentService.js
const userService = require('./userService'); // C → A (circular!)
class PaymentService {
  async refund(order) {
    const user = await userService.findById(order.userId); // Needs user for refund
    await this.processRefund(user.paymentMethod, order.total);
  }
}
```

**Good: Break the cycle with dependency inversion**

```javascript
// paymentService.js — no longer depends on userService
class PaymentService {
  async refund(order, paymentMethod) {
    // Payment method passed in, no need to import userService
    await this.processRefund(paymentMethod, order.total);
  }
}

// orderService.js — orchestrates the flow
class OrderService {
  async cancelUserOrders(userId) {
    const user = await userRepo.findById(userId);
    const orders = await this.findByUser(userId);
    for (const order of orders) {
      await paymentService.refund(order, user.paymentMethod);
    }
  }
}
```

---

### Mixed Concerns — React Component with SQL

**Bad: Database query in a UI component**

```jsx
// UserProfile.jsx — SoC violation
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // SQL in a React component!
    const result = await pool.query(
      `SELECT u.*, COUNT(o.id) as order_count
       FROM users u LEFT JOIN orders o ON o.user_id = u.id
       WHERE u.id = $1 GROUP BY u.id`,
      [userId]
    );
    setUser(result.rows[0]);
  }, [userId]);

  return <div>{user?.name} — {user?.order_count} orders</div>;
}
```

**Good: Separated layers**

```jsx
// api/users.js
async function fetchUserProfile(userId) {
  const response = await fetch(`/api/users/${userId}/profile`);
  return response.json();
}

// hooks/useUserProfile.js
function useUserProfile(userId) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserProfile(userId).then(setUser);
  }, [userId]);
  return user;
}

// components/UserProfile.jsx
function UserProfile({ userId }) {
  const user = useUserProfile(userId);
  if (!user) return <Spinner />;
  return <div>{user.name} — {user.orderCount} orders</div>;
}
```

---

## Real-World Anti-Patterns

### Lava Flow

**Symptoms:** Dead code nobody dares to delete because "it might be needed" or "I don't know what it does."

- Commented-out functions with no explanation
- Files named `old_`, `backup_`, `_deprecated`
- Unused imports and variables across the codebase
- Feature flags that have been `true` for years

**Fix:** Delete it. Version control has history. If nobody knows what it does, instrument it with logging before removing.

---

### Golden Hammer

**Symptoms:** Using the same tool/pattern for everything, regardless of fit.

- Redux for a 3-page app with no shared state
- Microservices for a 2-person team with one product
- GraphQL for an internal tool with 5 endpoints
- Kubernetes for a single-instance application

**Fix:** Match tool to problem scale. Start simple, add complexity only when you hit the limitation the complex tool solves.

---

### Big Ball of Mud

**Symptoms:** No discernible architecture. Everything depends on everything.

- Any file can import any other file
- No clear module boundaries or layering
- Changing one feature requires touching 10+ files across the codebase
- New developers take weeks to understand where to add code

**Fix:** Identify natural boundaries (by feature or domain), introduce module boundaries incrementally, enforce import rules.

---

## Positive Architecture Examples

### Well-Structured Express API

```
src/
├── routes/          ← HTTP layer: parse request, call controller, format response
│   ├── users.js
│   └── orders.js
├── controllers/     ← Application logic: orchestrate services, handle errors
│   ├── userController.js
│   └── orderController.js
├── services/        ← Business logic: rules, calculations, workflows
│   ├── userService.js
│   └── orderService.js
├── repositories/    ← Data access: queries, persistence
│   ├── userRepo.js
│   └── orderRepo.js
├── middleware/       ← Cross-cutting: auth, validation, error handling
│   ├── auth.js
│   ├── validate.js
│   └── errorHandler.js
└── config/          ← Configuration: env vars, constants
    └── index.js
```

**Why it works:** Clear layer boundaries, unidirectional dependencies (routes → controllers → services → repos), cross-cutting concerns in middleware.

---

### Clean React Application

```
src/
├── pages/           ← Route-level components, minimal logic
│   ├── Dashboard.tsx
│   └── UserProfile.tsx
├── components/      ← Reusable UI components (presentational)
│   ├── DataTable.tsx
│   └── StatusBadge.tsx
├── hooks/           ← Custom hooks (state + side effects)
│   ├── useUsers.ts
│   └── useOrders.ts
├── context/         ← Shared state (auth, theme, app-level)
│   └── AuthContext.tsx
├── api/             ← API client functions
│   ├── users.ts
│   └── orders.ts
├── types/           ← TypeScript interfaces
│   └── index.ts
└── utils/           ← Pure helper functions (small, focused)
    └── formatting.ts
```

**Why it works:** Separation between pages (routing), components (UI), hooks (logic), context (state), and API (data fetching). Each layer has a clear responsibility.

---

### Modular Python Package

```
myapp/
├── users/
│   ├── __init__.py      ← Public API: from myapp.users import create_user
│   ├── models.py        ← Domain models
│   ├── services.py      ← Business logic
│   ├── repository.py    ← Data access
│   └── exceptions.py    ← Domain-specific errors
├── orders/
│   ├── __init__.py
│   ├── models.py
│   ├── services.py
│   ├── repository.py
│   └── exceptions.py
├── shared/
│   ├── __init__.py
│   ├── database.py      ← DB connection (injected, not imported directly)
│   └── events.py        ← Cross-module communication
└── main.py              ← Composition root: wire everything together
```

**Why it works:** Feature-based organization, each module has a public API via `__init__.py`, shared infrastructure isolated, composition root wires dependencies.
