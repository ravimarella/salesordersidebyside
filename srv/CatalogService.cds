namespace salesordersbys.srv;

using { API_SALES_ORDER_SRV } from './external/API_SALES_ORDER_SRV';

service CatalogService {

    entity MySalesOrder as projection on API_SALES_ORDER_SRV.A_SalesOrder{
        key SalesOrder,
        SalesOrganization,
        SalesOrderType,
        SalesOrderDate
    };     

}

