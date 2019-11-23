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
const RegisterStructure = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterStructure')
const ConsultTables = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultTables')
const ConsultRoles = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultRoles')
const ConsultQuotation = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultQuotation')
const ConsultCoin = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/ConsultCoin')
const RegisterQuotation = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterQuotation')
const RegisterRoles = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterRoles')
const RegisterTable = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterTable')
const RegisterCoin = () => import(/* webpackChunkName: "register-structure" */ '../views/register/structural/RegisterCoin')

// Cadastro do Estoque
const RegisterStorage = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/RegisterStorage')
const ConsultProductGroup = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/ConsultProductGroup')
const RegisterProductGroup = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/RegisterProductGroup')
const ConsultUnitMeasurement = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/ConsultUnitMeasurement')
const RegisterUnitMeasurement = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/RegisterUnitMeasurement')
const ConsultProduct = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/ConsultProduct')
const RegisterProduct = () => import(/* webpackChunkName: "register-storage" */ '../views/register/storage/RegisterProduct')

//Cadastro do Financeiro
const RegisterFinancial = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/RegisterFinancial')
const ConsultDocumentType = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/ConsultDocumentType')
const RegistertDocumentType = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/RegistertDocumentType')
const ConsultBank = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/ConsultBank')
const RegistertBank = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/RegistertBank')
const ConsultPaymentType = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/ConsultPaymentType')
const RegistertPaymentType = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/RegistertPaymentType')
const ConsultBankAccount = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/ConsultBankAccount')
const RegistertBankAccount = () => import(/* webpackChunkName: "register-financial" */ '../views/register/financial/RegistertBankAccount')

const TableMap = () => import(/* webpackChunkName: "point-of-sale" */ '../views/pos/TableMap')
const NewOrder = () => import(/* webpackChunkName: "point-of-sale" */ '../views/pos/NewOrder')
const TableDetails = () => import(/* webpackChunkName: "point-of-sale" */ '../views/pos/TableDetails')

const Cashier = () => import(/* webpackChunkName: "point-of-sale" */ '../views/cashier/Cashier')
const CloseClientAccount = () => import(/* webpackChunkName: "point-of-sale" */ '../views/cashier/CloseClientAccount')

const AccountsPayables = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/AccountsPayables')
const NewAccountPayable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/NewAccountPayable')
const DetailsAccountPayable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/DetailsAccountPayable')
const DetailsInstallmentPayable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/DetailsInstallmentPayable')
const ConsultInstallmentPayable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/ConsultInstallmentPayable')
const AccountsReceivables = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/AccountsReceivables')
const NewAccountReceivable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/NewAccountReceivable')
const DetailsAccountReceivable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/DetailsAccountReceivable')
const ConsultInstallmentReceivable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/ConsultInstallmentReceivable')
const DetailsInstallmentReceivable = () => import(/* webpackChunkName: "accounts" */ '../views/accounts/DetailsInstallmentReceivable')


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
    // INICIO CADASTRO GEOGRAFICO
    {
      path: 'cadastros-geografico',
      name: 'Cadastros',
      component: RegisterGeography,
      children: [
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
      },
      {
        path: 'pais',
        name: 'CadastrarPais',
        component: RegisterCountry,
        props: true
      },
      {
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
    // FIM CADASTRO GEOGRAFICO

    // INICIO CADASTRO PESSOAS
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
    // FIM CADASTRO PESSOAS

    // INICIO CADASTRO ESTRUTURAL
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
    // FIM CADASTRO ESTRUTURAL

    // INICIO CADASTRO ESTOQUE
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
    // FIM CADASTRO ESTOQUE

    // INICIO CADASTRO FINANCEIRO
    {
      path: 'cadastro-financeiro',
      name: 'CadastroFinanceiro',
      component: RegisterFinancial,
      children: [
      {
        path: 'consulta-tipo-documento',
        name: 'ConsultarTiposDocumento',
        component: ConsultDocumentType
      },
      {
        path: 'cadastrar-tipo-documento',
        name: 'CadastrarTipoDocumento',
        component: RegistertDocumentType,
        props: true
      },     
      {
        path: 'consulta-banco',
        name: 'ConsultarBanco',
        component: ConsultBank
      },
      {
        path: 'cadastrar-banco',
        name: 'CadastrarBanco',
        component: RegistertBank,
        props: true
      },
      {
        path: 'consulta-tipo-pagamento',
        name: 'ConsultarTipoPagamento',
        component: ConsultPaymentType
      },
      {
        path: 'cadastrar-tipo-pagamento',
        name: 'CadastrarTipoPagamento',
        component: RegistertPaymentType,
        props: true
      },
      {
        path: 'consulta-conta-bancaria',
        name: 'ConsultarContaBancaria',
        component: ConsultBankAccount
      },
      {
        path: 'cadastrar-conta-bancaria',
        name: 'CadastrarContaBancaria',
        component: RegistertBankAccount,
        props: true
      } 
      ]      
    },
    // FIM CADASTRO FINANCEIRO    
    
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
      props: true,
      children: [
        {
          path: 'fechamento-conta',
          name: 'FechamentoConta',
          component: CloseClientAccount,
          props: true
        }
      ]
    },
    {
      path: 'contas-pagar',
      name: 'ContasPagar',
      component: AccountsPayables,
      children: [
        {
          path: 'nova-conta-pagar',
          name: 'NovaContaPagar',
          component: NewAccountPayable,
          props: true
        },
        {
          path: 'detalhes-conta-pagar',
          name: 'DetalhesContaPagar',
          component: DetailsAccountPayable,
          props: true
        },
        {
          path: 'detalhes-parcelas-pagar',
          name: 'DetalhesParcelaPagar',
          component: DetailsInstallmentPayable,
          props: true
        },
        {
          path: 'consultar-parcelas-pagar',
          name: 'ConsultarParcelaPagar',
          component: ConsultInstallmentPayable
        }
      ]
    },
    {
      path: 'contas-receber',
      name: 'ContasReceber',
      component: AccountsReceivables,
      children: [
        {
          path: 'nova-conta-receber',
          name: 'NovaContaReceber',
          component: NewAccountReceivable,
          props: true
        },
        {
          path: 'detalhes-conta-receber',
          name: 'DetalhesContaReceber',
          component: DetailsAccountReceivable,
          props: true
        },
        {
          path: 'consultar-parcelas-receber',
          name: 'ConsultarParcelaReceber',
          component: ConsultInstallmentReceivable
        },
        {
          path: 'detalhes-parcelas-receber',
          name: 'DetalhesParcelaReceber',
          component: DetailsInstallmentReceivable,
          props: true
        },
      ]
    }],
  }],
})
