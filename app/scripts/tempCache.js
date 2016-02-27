/**
 * Created by VLADY on 07/02/2015.
 */

app.factory('tempCache', function () {
    return {
        grupoAdicionado: null,
        grupoInfo: null,
        idEntidadSeleccionada: null,
        valor1: "",
        actualizaListaProveedorCliente: null,
        proveedorClienteInfo: null,
        tipoCambioContabilidad: null,
        proveedorGrupoConcepto: null,//Item Seleccionado. Origen: prefiltradoFactura.js, Destino: registroFactura.js
        criterioBusquedaFactura: null,//Origen: prefiltradoFactura.js, Destino:registroFactura.js
        idDosificacionSeleccionada:null,//Dosificacion Seleccionada. Origen: dosificacionEmisionFactura.js, Destino: emisionFactura.js
        idSucursalSeleccionada:null,//Dosificacion Seleccionada. Origen: dosificacionEmisionFactura.js, Destino: emisionFactura.js
        idFacturaParaBancarizar:null,//Factura para registrar pago bancarizado, Origen: listaFacturaCliente.js, Destino:emisionFactura
        pagoContrato:null,//Variable para editar PagoContrato de la lista esto en el Formulario Contrato
        tipoCambioContrato:null,//Variable para crear un nuevo Pago Contrato
        objetoContratoData:null,//Variable para crear un nuevo Pago Contrato
        pagoContratoInfo:null,//Pago-Contrato seleccionado, Origen:cobrosPorFactura,Destino:emisionFacturaContrato
        idDosificacionPorContrato:null,//Dosificacion seleccionada para emitir factura por contrato, Origen: modal buscadorDosificacionesCtrl.js, Destino:emisionFacturaContratoCtrl.js
        temp_idContrato:null,//Contrato seleccionado, Origen: cobrosPorFacturar, Destino: emisionFacturaContrato
        tipoCobroFactura:null,//Tipo Emision o Registro para Factura por contrato, Origen cobrosPorFacturar, Destino: emisionFacturaContrato
        listaFacturasBancarizar:[],//Lista de facturas para bancarizar, Origen: listaFacturaCliente, Destino: pagoBancarizado
        idUsuario:null,//Usuario seleccionado para asignar roles, Origen: usuarios.js, Destino: administracionRoles.js
        facturaEmitidaCache:null,//Variable para seleccionar Factura Emitida Nota Debito-Credito, Origen: listaFacturaClienteNotaDebitoCreditoCtrl.js, Destino: .js
        listaColumnasReporte:[],//Lista de columnas para generar reporte, Origen:controlIngresos, Destino:reporteGeneradoControlIng
        listaComprasPorBancarizar:[]//Lista de documentos para bancarizar, Origen: listaBancarizacionCompras, Destino: documentoPago

    }
});

app.factory("cleanTempCache", function (tempCache) {
    return {
        cleanGrupoAdicionado: function () {
            tempCache["grupoAdicionado"] = null;
        },
        cleanValor1: function () {
            tempCache["valor1"] = "";
        },
        cleanActualizaListaProveedorCliente: function () {
            tempCache["actualizaListaProveedorCliente"] = "";
        },
        cleanProveedorClienteInfo: function () {
            tempCache["proveedorClienteInfo"] = null;
        },
        cleanTipoCambioContabilidad: function () {
            tempCache["tipoCambioContabilidad"] = null;
        },
        cleanIdProveedorConcepto: function () {
            tempCache["idProveedorConcepto"] = null;
        },
        cleanProveedorGrupoConcepto: function () {
            tempCache["proveedorGrupoConcepto"] = null;
        },
        cleanCriterioBusquedaFactura: function () {
            tempCache["criterioBusquedaFactura"] = null;
        },
        cleanPagoContrato: function () {
            tempCache["pagoContrato"] = null;
        },
        cleanTipoCambioContrato: function () {
            tempCache["tipoCambioContrato"] = null;
        },
        cleanObjetoContratoData: function () {
            tempCache["objetoContratoData"] = null;
        },
        cleanFacturaEmitidaCache: function () {
            tempCache["facturaEmitidaCache"] = null;
        }
    }
});
