export const authBasicConfig = {
   produccion: false,
   ssl: true,
   url_base_prod: 'https://cfsmqcpreprod.publicidadorigen.cl',
   url_base_qa: 'https://cfsmqcpreprod.publicidadorigen.cl',
   //url_base_prod: 'https://cfsmqc.publicidadorigen.cl',
   //url_base_qa: 'https://cfsmqc.publicidadorigen.cl',
   headers: {'Content-Type': 'application/json'},
   //headers: new Headers({'Content-Type': 'application/json'}),
   //options: new RequestOptions({ headers: {'Content-Type': 'application/json'} }),
}