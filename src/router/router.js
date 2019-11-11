import Vue from 'vue'
import Router from 'vue-router'

// Rotas atualizadas com base no seguinte artigo da documentação:
// https://router.vuejs.org/guide/advanced/lazy-loading.html

// Main containers
const Dashboard = () => import(/* webpackChunkName: "main" */ '../views/Dashboard')
const TheContent = () => import(/* webpackChunkName: "main" */ '../components/template/TheContent')

// Cadastros Geograficos
const RegisterGeography = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/RegisterGeography')
const RegisterCountry = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/RegisterCountry')
const RegisterState = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/RegisterState')
const RegisterCity = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/RegisterCity')
const ConsultCountry = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/ConsultCountry')
const ConsultState = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/ConsultState')
const ConsultCity = () => import(/* webpackChunkName: "register-geograpgy" */ '../views/register/geographical/ConsultCity')

// Cadastros de Pessoas
const RegisterPeople = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/RegisterPeople')
const ConsultEmployee = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/ConsultEmployee')
const ConsultProvider = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/ConsultProvider')
const ConsultCustomer = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/ConsultCustomer')
const RegisterEmployee = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/RegisterEmployee')
const RegisterProvider = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/RegisterProvider')
const RegisterCustomer = () => import(/* webpackChunkName: "register-people" */ '../views/register/people/RegisterCustomer')

// Cadastros de Estrutura
const RegisterStructure = () => import(/* webpackChunkName: "register-people" */ '../views/register/structural/RegisterStructure')
const ConsultTables = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultTables')
const ConsultRoles = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultRoles')
const ConsultNcm = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultNcm')
const ConsultCest = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultCest')
const ConsultCstPisCofins = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultCstPisCofins')
const ConsultCstCsosn = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultCstCsosn')
const ConsultCfop = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultCfop')
const ConsultQuotation = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultQuotation')
const ConsultCoin = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultCoin')
const RegisterCest = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterCest')
const RegisterCfop = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterCfop')
const RegisterCstCsosn = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterCstCsosn')
const RegisterCstPisCofins = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterCstPisCofins')
const RegisterNcm = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterNcm')
const RegisterQuotation = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterQuotation')
const RegisterRoles = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterRoles')
const RegisterTable = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterTable')
const RegisterCoin = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterCoin')


// Cadastro do Estoque
const RegisterStorage = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/RegisterStorage')
const ConsultProductGroup = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/ConsultProductGroup')
const RegisterProductGroup = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/RegisterProductGroup')
const ConsultUnitMeasurement = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/ConsultUnitMeasurement')
const RegisterUnitMeasurement = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/RegisterUnitMeasurement')
const ConsultProduct = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/ConsultProduct')
const RegisterProduct = () => import(/* webpackChunkName: "register-people" */ '../views/register/storage/RegisterProduct')


const TableMap = () => import(/* webpackChunkName: "point-of-sale" */ '../views/pos/TableMap')
const NewOrder = () => import(/* webpackChunkName: "point-of-sale" */ '../views/pos/NewOrder')
const TableDetails = () => import(/* webpackChunkName: "point-of-sale" */ '../views/pos/TableDetails')

const Cashier = () => import(/* webpackChunkName: "point-of-sale" */ '../views/cashier/Cashier')
const CloseClientAccount = () => import(/* webpackChunkName: "point-of-sale" */ '../views/cashier/CloseClientAccount')


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-link-active open',
  linkExactActiveClass: 'router-link-exact-active link-exato',
  routes: [{
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContent,
    children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: 'cadastros-geografico',
      name: 'Cadastros',
      component: RegisterGeography,
      children: [,
      {
        path: 'paises',
        name: 'ConsultarPais',
        component: ConsultCountry,
      }, {
        path: 'estados',
        name: 'ConsultarEstado',
        component: ConsultState,
      }, {
        path: 'cidades',
        name: 'ConsultarCidade',
        component: ConsultCity,
      },{
        path: 'pais',
        name: 'CadastrarPais',
        component: RegisterCountry,
        props: true
      }, {
        path: 'estado',
        name: 'CadastrarEstado',
        component: RegisterState,
        props: true
      }, {
        path: 'cidade',
        name: 'CadastrarCidade',
        component: RegisterCity,
        props: true
      }]
    },
    {
      path: 'cadastro-pessoas',
      name: 'CadastroPessoas',
      component: RegisterPeople,
      children: [
      {
        path: 'funcionarios',
        name: 'ConsultarFuncionarios',
        component: ConsultEmployee
      },
      {
        path: 'fornecedores',
        name: 'ConsultarFornecedores',
        component: ConsultProvider,
      },
      {
      path: 'clientes',
      name: 'ConsultarClientes',
      component: ConsultCustomer,
      },
      {
      path: 'funcionario',
      name: 'CadastrarFuncionario',
      component: RegisterEmployee,
      props: true
      },
      {
      path: 'fornecedor',
      name: 'CadastrarFornecedor',
      component: RegisterProvider,
      props: true
      },
      {
      path: 'cliente',
      name: 'CadastrarCliente',
      component: RegisterCustomer,
      props: true
      }]
    },
    {
      path: 'cadastro-estrutural',
      name: 'CadastrosEstruturais',
      component: RegisterStructure,
      children: [
      {
        path: 'mesas',
        name: 'ConsultarMesas',
        component: ConsultTables
      },
      {
        path: 'funcoes',
        name: 'ConsultarFuncoes',
        component: ConsultRoles
      },
      /* {
        path: 'ncms',
        name: 'ConsultarNCM',
        component: ConsultNcm
      }, */
     /*  {
        path: 'cestes',
        name: 'ConsultarCEST',
        component: ConsultCest
      }, */
      /* {
        path: 'cst-pis-cofins-consulta',
        name: 'ConsultarCstPisCofins',
        component: ConsultCstPisCofins
      }, */
      /* {
        path: 'cst-csosn-consulta',
        name: 'ConsultarCstCsosn',
        component: ConsultCstCsosn
      }, */
     /*  {
        path: 'cfops',
        name: 'ConsultarCfop',
        component: ConsultCfop
      }, */
      {
        path: 'cotacoes',
        name: 'ConsultarCotacao',
        component: ConsultQuotation
      },
      {
        path: 'moedas',
        name: 'ConsultarMoeda',
        component: ConsultCoin
      },
      /* {
        path: 'cest',
        name: 'CadastrarCest',
        component: RegisterCest,
        props: true
      }, */
      /* {
        path: 'cfop',
        name: 'CadastrarCfop',
        component: RegisterCfop,
        props: true
      }, */
      /* {
        path: 'cst-csosn-registro',
        name: 'CadastrarCstCsosn',
        component: RegisterCstCsosn,
        props: true
      }, */
      /* {
        path: 'cst-pis-cofins-registro',
        name: 'CadastrarCstPisCofins',
        component: RegisterCstPisCofins,
        props: true
      } */,
      /* {
        path: 'ncm',
        name: 'CadastrarNcm',
        component: RegisterNcm,
        props: true
      }, */
      {
        path: 'cotacao',
        name: 'CadastrarCotacao',
        component: RegisterQuotation,
        props: true
      },
      {
        path: 'funcao',
        name: 'CadastrarFuncao',
        component: RegisterRoles,
        props: true
      },
      {
        path: 'mesa',
        name: 'CadastrarMesa',
        component: RegisterTable,
        props: true
      },
      {
        path: 'moeda',
        name: 'CadastrarMoeda',
        component: RegisterCoin,
        props: true
      }
      ]
    },
    {
      path: 'cadastro-estoque',
      name: 'CadastroEstoque',
      component: RegisterStorage,
      children: [
      {
        path: 'consulta-grupo-produto',
        name: 'ConsultarGrupoProdutos',
        component: ConsultProductGroup
      },
      {
        path: 'cadastrar-grupo-produto',
        name: 'CadastrarGrupoProdutos',
        component: RegisterProductGroup,
        props: true
      },
      {
        path: 'consulta-unidade-medida',
        name: 'ConsultarUnidadeMedida',
        component: ConsultUnitMeasurement
      },
      {
        path: 'cadastrar-unidade-medida',
        name: 'CadastrarUnidadeMedida',
        component: RegisterUnitMeasurement,
        props: true
      },
      {
        path: 'consulta-produto',
        name: 'ConsultarProdutos',
        component: ConsultProduct
      }, {
        path: 'cadastrar-produto',
        name: 'CadastrarProduto',
        component: RegisterProduct,
        props: true
      },]      
    },
    {
      path: 'mapa-mesas',
      name: 'MapaMesas',
      component: TableMap,
    },
    {
      path: 'novo-pedido',
      name: 'NovoPedido',
      component: NewOrder,
    },
    {
      path: 'resumo-mesa',
      name: 'ResumoMesa',
      component: TableDetails,
      props: true
    },
    {
      path: 'caixa',
      name: 'Caixa',
      component: Cashier,
      children: [
        {
          path: 'fechamento-conta',
          name: 'FechamentoConta',
          component: CloseClientAccount,
          props: true
        }
      ]
    }],
  }],
})
