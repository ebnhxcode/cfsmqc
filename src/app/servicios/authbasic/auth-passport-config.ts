export const authPassportConfig = {
   produccion: false,
   ssl: true,
   urlBackend: 'https://cfsmqcpreprod.publicidadorigen.cl',




   url_base_prod: 'https://cfsmqcpreprod.publicidadorigen.cl',
   url_base_qa: 'https://cfsmqcpreprod.publicidadorigen.cl',
   //url_base_prod: 'https://cfsmqc.publicidadorigen.cl',
   //url_base_qa: 'https://cfsmqc.publicidadorigen.cl',
   headers: {'Content-Type': 'application/json; charset=UTF-8', 'withCredentials': true},

   /* Preprod */
   apiRoot: 'https://cfsmqcpreprod.publicidadorigen.cl',
   //apiRoot: 'https://cfsmq.publicidadorigen.cl',
   clientId: 11,
   clientSecret: 'S4HefduIdpMZJVRzISv2Be53lVDksFKJjNPx9H4o'

   /* Prod */
   /*
   apiRoot: 'https://cfsmqc.publicidadorigen.cl',
   clientId: 5,
   clientSecret: 'jy6taFrioQgbfftl5scSl0l2Vo1ZVRSTV6DTiLPu'
   */


   //headers: new Headers({'Content-Type': 'application/json'}),
   //options: new RequestOptions({ headers: {'Content-Type': 'application/json'} }),
}