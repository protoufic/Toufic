import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';

export function NotFoundPage() {
  return <Layout><section className="not-found"><p className="eyebrow">404</p><h1>This page is not part of the mission.</h1><Link className="button-primary" to="/"><ArrowLeft size={16} />Return Home</Link></section></Layout>;
}
