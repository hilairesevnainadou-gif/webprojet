import { CrudView } from './SharedCrud';
export default function GestionBlog() { return <CrudView title="Gestion Blog" endpoint="/blogs" fields={['title','content','status']} />; }
