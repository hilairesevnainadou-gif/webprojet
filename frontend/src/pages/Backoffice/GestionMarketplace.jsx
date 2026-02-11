import { CrudView } from './SharedCrud';
export default function GestionMarketplace() { return <CrudView title="Gestion Marketplace" endpoint="/marketplace" fields={['name','description','price','stock']} />; }
