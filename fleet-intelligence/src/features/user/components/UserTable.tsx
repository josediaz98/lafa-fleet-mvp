import type { User, Session } from '@/types';
import { getCenterName } from '@/lib/format';
import { usePagination } from '@/lib/use-pagination';
import StatusBadge from '@/components/ui/StatusBadge';
import PaginationControls from '@/components/ui/PaginationControls';

interface UserTableProps {
  users: User[];
  session: Session | null;
  onSelect: (user: User) => void;
}

export default function UserTable({
  users,
  session,
  onSelect,
}: UserTableProps) {
  const {
    paginatedItems,
    currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = usePagination(users);

  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
      {/* Mobile card list */}
      <div className="sm:hidden space-y-2 p-2">
        {paginatedItems.map(user => {
          const isCurrentUser = session && user.id === session.userId;
          return (
            <div key={user.id} onClick={() => onSelect(user)}
                 className="bg-lafa-surface border border-lafa-border rounded-lg p-3 cursor-pointer active:bg-lafa-accent/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-lafa-text-primary flex items-center gap-2">
                  {user.name}
                  {isCurrentUser && (
                    <span className="text-[10px] font-medium text-lafa-accent bg-lafa-accent/10 px-1.5 py-0.5 rounded">Tú</span>
                  )}
                </span>
                <StatusBadge status={user.status} />
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-lafa-text-secondary">
                <StatusBadge status={user.role} />
              </div>
            </div>
          );
        })}
      </div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lafa-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Nombre
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Rol
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider hidden sm:table-cell">
                Centro asignado
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((user, i) => {
              const isCurrentUser = session && user.id === session.userId;
              return (
                <tr
                  key={user.id}
                  onClick={() => onSelect(user)}
                  className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors duration-150 ${
                    isCurrentUser
                      ? 'bg-lafa-accent/5 border-l-2 border-l-lafa-accent'
                      : i % 2 === 0
                        ? 'bg-transparent'
                        : 'bg-lafa-bg/30'
                  }`}
                >
                  <td className="px-4 py-3 text-lafa-text-primary font-medium">
                    <span className="flex items-center gap-2">
                      {user.name}
                      {isCurrentUser && (
                        <span className="text-[10px] font-medium text-lafa-accent bg-lafa-accent/10 px-1.5 py-0.5 rounded">
                          {'Tú'}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-lafa-text-secondary hidden sm:table-cell">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.role} />
                  </td>
                  <td className="px-4 py-3 text-lafa-text-secondary hidden sm:table-cell">
                    {getCenterName(user.centerId)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-lafa-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs text-lafa-text-secondary">
          {rangeStart}–{rangeEnd} de {users.length} usuario
          {users.length !== 1 ? 's' : ''}
        </span>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
