import React from 'react';
import { Link } from 'react-router-dom';

type CardLinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function Button({ to, children }: CardLinkProps) {
  return <Link to={to}>{children}</Link>;
}
