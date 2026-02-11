import { CrudView } from './SharedCrud';
export default function GestionProjets() { return <CrudView title="Gestion Projets" endpoint="/projects" fields={['title','summary','url','status']} />; }
