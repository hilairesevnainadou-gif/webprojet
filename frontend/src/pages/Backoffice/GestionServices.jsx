import { CrudView } from './SharedCrud';
export default function GestionServices() { return <CrudView title="Gestion Services" endpoint="/services" fields={['name','description','price']} />; }
