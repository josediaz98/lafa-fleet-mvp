import { useState, useMemo } from 'react';
import type { User } from '@/types';

export function useUserFilters(users: User[]) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  return {
    filtered,
    search,
    setSearch,
  };
}
