# Modulos y submodulos de los sistemas

Este documento define la estructura funcional inicial de los sistemas de la plataforma. La organizacion busca que cada sistema tenga una responsabilidad clara y que no se dupliquen funciones entre ERP, WMS, TMS, DMS y RRHH.

## 1. ERP - Enterprise Resource Planning

El ERP centraliza la gestion administrativa, comercial, financiera y contable de la empresa. Su funcion principal es registrar las operaciones del negocio, controlar ingresos y egresos, administrar compras y ventas, y entregar informacion confiable para la toma de decisiones.

### 1.1 Finanzas y Contabilidad

Administra la informacion contable y financiera de la empresa, permitiendo registrar operaciones, generar estados financieros y cumplir obligaciones contables.

- Contabilidad general
- Plan contable
- Cuentas por cobrar
- Cuentas por pagar
- Activos fijos
- Cierres contables
- Estados financieros

### 1.2 Ventas

Gestiona el proceso comercial desde la cotizacion hasta la facturacion, incluyendo devoluciones, precios y condiciones comerciales.

- Cotizaciones
- Pedidos de venta
- Facturacion
- Notas de credito
- Notas de debito
- Devoluciones de venta
- Listas de precios
- Descuentos
- Comisiones

### 1.3 Compras

Controla el abastecimiento de bienes y servicios, desde la solicitud interna hasta la recepcion y registro de facturas de proveedores.

- Solicitudes de compra
- Cotizaciones de proveedores
- Ordenes de compra
- Recepcion de compras
- Facturas de proveedores
- Devoluciones a proveedores
- Evaluacion de proveedores

### 1.4 Inventario administrativo

Controla la existencia valorizada de productos desde una perspectiva administrativa y contable. El detalle operativo de ubicaciones, picking, packing y despacho pertenece al WMS.

- Productos
- Categorias
- Unidades de medida
- Stock valorizado
- Transferencias
- Ajustes de inventario
- Kardex
- Lotes
- Series

### 1.5 Tesoreria

Gestiona el flujo real de dinero de la empresa, incluyendo cajas, bancos, pagos, cobranzas y proyeccion de liquidez.

- Caja
- Bancos
- Ingresos
- Egresos
- Transferencias bancarias
- Pagos
- Cobranzas
- Conciliacion bancaria
- Flujo de caja

### 1.6 Clientes y Proveedores

Administra la informacion maestra de terceros relacionados con la empresa.

- Clientes
- Proveedores
- Contactos
- Direcciones
- Condiciones comerciales
- Limites de credito
- Historial comercial

### 1.7 Presupuestos y Costos

Permite planificar, controlar y analizar los costos e ingresos esperados frente a los resultados reales.

- Presupuestos
- Centros de costo
- Costos operativos
- Costos por area
- Costos por proyecto
- Control presupuestario

### 1.8 Reportes y BI

Consolida informacion clave del ERP para analisis operativo, financiero y gerencial.

- Dashboard ejecutivo
- Reportes de ventas
- Reportes de compras
- Reportes financieros
- Rentabilidad
- Flujo de caja
- KPIs

### 1.9 Configuraciones

Administra los parametros generales del sistema, accesos, reglas internas y estructuras base necesarias para operar el ERP.

- Usuarios
- Roles
- Permisos
- Flujos de aprobacion
- Auditoria
- Bitacora de cambios
- Parametros generales
- Empresas y sucursales
- Series y correlativos
- Impuestos
- Monedas y tipo de cambio
- Plantillas y formatos

## 2. WMS - Warehouse Management System

El WMS gestiona la operacion fisica del almacen. Su responsabilidad principal es controlar recepcion, ubicacion, almacenamiento, picking, packing, despacho, movimientos internos y exactitud operativa del inventario.

### 2.1 Configuracion de almacenes

- Almacenes
- Areas
- Zonas
- Pasillos
- Racks
- Niveles
- Ubicaciones
- Muelles

### 2.2 Maestros logisticos

- SKU
- Productos
- Categorias
- Unidades
- Codigos de barras
- Lotes
- Series
- Dimensiones
- Peso

### 2.3 Recepcion

- Ordenes de recepcion
- ASN
- Recepcion de compras
- Recepcion de transferencias
- Recepcion de devoluciones
- Conteo
- Diferencias
- Inspeccion

### 2.4 Putaway y almacenamiento

- Reglas de ubicacion
- Asignacion de ubicacion
- Putaway automatico
- Putaway manual
- Reubicacion
- Consolidacion

### 2.5 Inventario operativo

- Stock por almacen
- Stock por ubicacion
- Stock disponible
- Stock reservado
- Stock bloqueado
- Stock en transito
- Kardex operativo
- Lotes
- Series
- Vencimientos

### 2.6 Picking

- Picking por pedido
- Picking por ola
- Picking por zona
- Picking por ruta
- Picking por lote
- Picking parcial
- Reposicion

### 2.7 Packing

- Empaque
- Cajas
- Bultos
- Etiquetas
- Pesaje
- Dimensiones
- Consolidacion

### 2.8 Despacho

- Pedidos preparados
- Verificacion
- Consolidacion de carga
- Control de salida
- Entrega al transportista

### 2.9 Movimientos internos

- Transferencias
- Reubicaciones
- Ajustes
- Consumos
- Devoluciones

### 2.10 Inventario fisico

- Inventario general
- Conteo ciclico
- Conteo por ubicacion
- Reconteo
- Ajustes por diferencias

### 2.11 Calidad

- Inspecciones
- Cuarentena
- Productos danados
- Productos rechazados
- Liberacion
- No conformidades

### 2.12 Equipos y dispositivos

- Handheld
- RF
- Codigo de barras
- RFID
- Impresoras
- Balanzas

### 2.13 Reportes y KPIs

- Exactitud de inventario
- Productividad de picking
- Tiempo de recepcion
- Tiempo de despacho
- Ocupacion
- Errores de picking
- Merma

### 2.14 Configuraciones

- Usuarios
- Roles
- Permisos
- Flujos de aprobacion
- Auditoria
- Bitacora de cambios
- Parametros operativos de almacen

## 3. TMS - Transportation Management System

El TMS gestiona la planificacion, ejecucion y control del transporte. Su alcance incluye ordenes de transporte, ruteo, flota, conductores, tracking, entregas, incidencias, costos y desempeno de distribucion.

### 3.1 Ordenes de transporte

- Solicitudes de transporte
- Ordenes de transporte
- Pedidos a transportar
- Consolidacion
- Prioridades
- Ventanas horarias

### 3.2 Planificacion

- Planificacion de viajes
- Asignacion de vehiculos
- Asignacion de conductores
- Consolidacion de cargas
- Capacidad
- Secuencia de entregas

### 3.3 Ruteo

- Creacion de rutas
- Optimizacion de rutas
- Zonas
- Paradas
- Distancias
- Ventanas horarias

### 3.4 Flota

- Vehiculos
- Tipos de vehiculo
- Capacidad
- Kilometraje
- Combustible
- Documentacion
- Disponibilidad

### 3.5 Conductores

- Conductores
- Licencias
- Documentos
- Asignaciones
- Historial de viajes
- Incidencias

### 3.6 Tracking

- GPS
- Ubicacion
- Seguimiento en tiempo real
- ETA
- Geocercas
- Paradas
- Historial de recorrido

### 3.7 Entregas y POD

- Entregas
- Confirmacion de entrega
- Firma digital
- Foto
- Fecha y hora
- Receptor
- Entrega parcial
- Rechazos

### 3.8 Incidencias

- Retrasos
- Averias
- Accidentes
- Cliente ausente
- Direccion incorrecta
- Producto danado
- Devoluciones

### 3.9 Transportistas

- Transportistas
- Proveedores de transporte
- Tarifarios
- Contratos
- Servicios
- Evaluacion

### 3.10 Costos de transporte

- Costo por viaje
- Costo por kilometro
- Costo por entrega
- Combustible
- Peajes
- Viaticos
- Fletes
- Liquidacion

### 3.11 Reportes y KPIs

- Entregas a tiempo
- Costo por kilometro
- Costo por entrega
- Utilizacion de flota
- Productividad
- Kilometros recorridos
- Rentabilidad por ruta

### 3.12 Configuraciones

- Usuarios
- Roles
- Permisos
- Flujos de aprobacion
- Auditoria
- Bitacora de cambios
- Parametros de transporte

## 4. DMS - Document Management System

El DMS administra documentos, archivos, versiones, busqueda, aprobaciones, firma electronica, seguridad documental, retencion e integraciones con otros sistemas.

### 4.1 Gestion documental

- Documentos
- Carpetas
- Categorias
- Tipos de documento
- Etiquetas
- Metadatos

### 4.2 Archivo

- Carga de documentos
- Digitalizacion
- Clasificacion
- Indexacion
- Versiones
- Historial

### 4.3 Busqueda

- Busqueda por nombre
- Busqueda por contenido
- Filtros
- Metadatos
- Etiquetas
- OCR

### 4.4 Versionamiento

- Versiones
- Control de cambios
- Comparacion
- Restauracion
- Historial

### 4.5 Flujos de trabajo

- Creacion de flujo
- Aprobaciones
- Revisiones
- Rechazos
- Delegaciones
- Notificaciones

### 4.6 Firma electronica

- Firma de documentos
- Solicitud de firma
- Firmantes
- Orden de firma
- Estado de firma
- Evidencias

### 4.7 Seguridad documental

- Acceso por carpeta
- Acceso por documento
- Restricciones
- Clasificacion de confidencialidad
- Auditoria documental

### 4.8 Retencion y archivo historico

- Politicas de retencion
- Vencimientos
- Archivo historico
- Eliminacion
- Recuperacion

### 4.9 Integraciones

- ERP
- WMS
- TMS
- RRHH
- API
- Correo electronico
- Almacenamiento externo

### 4.10 Reportes

- Documentos creados
- Documentos modificados
- Documentos vencidos
- Firmas pendientes
- Aprobaciones pendientes
- Auditoria

### 4.11 Configuraciones

- Usuarios
- Roles
- Permisos
- Flujos de aprobacion
- Auditoria
- Bitacora de cambios
- Parametros documentales

## 5. RRHH - Recursos Humanos

El sistema de RRHH gestiona el ciclo de vida del trabajador, desde el reclutamiento hasta la desvinculacion, incluyendo ficha del empleado, asistencia, vacaciones, nomina, desempeno, capacitacion, beneficios y portales de autogestion.

### 5.1 Empleados

- Ficha del empleado
- Datos personales
- Datos laborales
- Contactos
- Datos bancarios
- Datos familiares
- Documentos
- Historial laboral
- Historial salarial

### 5.2 Organizacion

- Empresas
- Sucursales
- Areas
- Departamentos
- Puestos
- Cargos
- Centros de costo
- Organigrama
- Jerarquias

### 5.3 Reclutamiento

- Requisiciones
- Vacantes
- Postulantes
- CV
- Entrevistas
- Evaluaciones
- Pruebas
- Seleccion
- Contratacion

### 5.4 Onboarding

- Checklist de ingreso
- Documentacion
- Contratos
- Induccion
- Capacitacion inicial
- Asignacion de puesto
- Asignacion de equipos

### 5.5 Asistencia

- Marcaciones
- Entrada y salida
- Turnos
- Horarios
- Jornadas
- Tardanzas
- Inasistencias
- Horas extras
- Justificaciones

### 5.6 Vacaciones y permisos

- Solicitudes
- Aprobaciones
- Calendario
- Saldos
- Vacaciones
- Permisos
- Licencias
- Ausencias

### 5.7 Nomina

- Sueldos
- Conceptos salariales
- Bonificaciones
- Comisiones
- Horas extras
- Descuentos
- Retenciones
- Adelantos
- Prestamos
- Boletas
- Liquidaciones

### 5.8 Desempeno

- Evaluaciones
- Objetivos
- KPIs
- Competencias
- Evaluacion 360 grados
- Calificaciones
- Planes de mejora

### 5.9 Capacitacion

- Cursos
- Planes de capacitacion
- Inscripciones
- Asistencia
- Evaluaciones
- Certificaciones
- Historial

### 5.10 Beneficios

- Seguros
- Alimentacion
- Transporte
- Bonos
- Beneficios corporativos
- Asignaciones

### 5.11 Activos del empleado

- Equipos
- Computadoras
- Celulares
- Uniformes
- Herramientas
- Vehiculos
- Asignaciones
- Devoluciones

### 5.12 Desvinculacion

- Renuncia
- Terminacion
- Despido
- Checklist de salida
- Devolucion de activos
- Liquidacion
- Entrevista de salida

### 5.13 Portal del empleado

- Mi perfil
- Mis documentos
- Mis boletas
- Mis asistencias
- Mis vacaciones
- Mis permisos
- Mis solicitudes
- Mis beneficios

### 5.14 Portal del jefe

- Equipo
- Aprobaciones
- Vacaciones
- Permisos
- Horas extras
- Asistencia
- Evaluaciones

### 5.15 Reportes y KPIs

- Headcount
- Rotacion
- Ausentismo
- Horas extras
- Costos laborales
- Vacaciones
- Nomina
- Desempeno
- Reclutamiento

### 5.16 Configuraciones

- Usuarios
- Roles
- Permisos
- Flujos de aprobacion
- Auditoria
- Bitacora de cambios
- Parametros de RRHH

## Resumen de responsabilidades

| Sistema | Responsabilidad principal |
| --- | --- |
| ERP | Negocio, finanzas, compras, ventas y administracion |
| WMS | Almacen, inventario operativo y ejecucion logistica interna |
| TMS | Transporte, rutas, flota, entregas y distribucion |
| DMS | Documentos, versiones, aprobaciones, firma y archivo |
| RRHH | Empleados, asistencia, nomina, desempeno y portales |

## Criterios para evitar duplicidad

- Los clientes, proveedores, productos y condiciones comerciales deben tener un maestro principal en ERP y ser consumidos por los demas sistemas cuando corresponda.
- El WMS controla la operacion fisica del almacen; el ERP conserva el inventario valorizado y contable.
- El TMS controla transporte y entrega; no debe duplicar facturacion ni cobranza del ERP.
- El DMS centraliza documentos, versiones y archivo; otros sistemas pueden adjuntar o consultar documentos, pero no reemplazar la gestion documental.
- RRHH administra colaboradores y nomina; los documentos laborales pueden integrarse con el DMS cuando se requiera archivo formal.
- Usuarios, roles, permisos, flujos de aprobacion, auditoria y bitacora de cambios deben ir dentro de Configuraciones en cada sistema o en una capa transversal de administracion si la plataforma se gestiona de forma unificada.
