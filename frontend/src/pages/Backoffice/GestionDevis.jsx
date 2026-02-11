import { CrudView } from './SharedCrud';
export default function GestionDevis() { return <CrudView title="Gestion Devis" endpoint="/quotes" fields={['name','email','status','response']} />; }
