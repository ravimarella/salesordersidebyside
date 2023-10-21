


const cds = require('@sap/cds');
//const apiSalesOrderSrv = require('./src/generated/API_SALES_ORDER_SRV');
//test push

module.exports=cds.service.impl(async function(srv){
    const { MySalesOrder } = this.entities;
   // const saor = await cds.connect.to('API_SALES_ORDER_SRV');  
   // console.log(saor);
  //  console.log("................log end.................")
    //const { A_SalesOrder } = saor.entities;
//console.log(A_SalesOrder);
  //  const result = await saor.run(SELECT(A_SalesOrder).limit(100));*/

var getAllSalesOrders = async function(){
    const { apiSalesOrderSrv } = require('./src/generated/api_sales_order_srv');
    const { salesOrderApi } = apiSalesOrderSrv();

    const dataSalesData = await salesOrderApi.requestBuilder().getAll().top(5).execute({
        /*"url":"https://my304870.s4hana.ondemand.com",
          "username":"P1940161775",
          "password":"Timb@2022"*/
          "destinationName":"S4HANA"
    });

    return dataSalesData;

}

srv.on('READ','MySalesOrder',async(req)=>{
    console.log("FETCHING SAOR")
    return await getAllSalesOrders().then(
        salesorderTable => {
            var aRecord = [];
            salesorderTable.forEach( element =>{
                var item = {};
                item.SalesOrder = element.SalesOrder;
                item.SalesOrganization = element.SalesOrganization;
                item.SalesOrderType = element.SalesOrderType;
                item.SalesOrderDate = element.SalesOrderDate;
                aRecord.push(item);
            });
            return aRecord;
        }
    );
    //return saor.run(req.query);
})

})