import Vue from 'vue'
import Router from 'vue-router'

// Rotas atualizadas com base no seguinte artigo da documentação:
// https://router.vuejs.org/guide/advanced/lazy-loading.html

// Main containers
const Dashboard = () => import(/* webpackChunkName: "main" */ '../views/Dashboard')
const TheContent = () => import(/* webpackChunkName: "main" */ '../components/template/TheContent')

// Cadastros
const RegisterGeography = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/RegisterGeography')
const RegisterCountry = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/RegisterCountry')
const RegisterState = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/RegisterState')
const RegisterCity = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/RegisterCity')
const ConsultCountry = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/ConsultCountry')
const ConsultState = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/ConsultState')
const ConsultCity = () => import(/* webpackChunkName: "main" */ '../views/register/geographical/ConsultCity')


const RegisterPeople = () => import(/* webpackChunkName: "main" */ '../views/register/people/RegisterPeople')
const ConsultEmployee = () => import(/* webpackChunkName: "main" */ '../views/register/people/ConsultEmployee')
const ConsultProvider = () => import(/* webpackChunkName: "main" */ '../views/register/people/ConsultProvider')
const ConsultCustomer = () => import(/* webpackChunkName: "main" */ '../views/register/people/ConsultCustomer')
const RegisterEmployee = () => import(/* webpackChunkName: "main" */ '../views/register/people/RegisterEmployee')
const RegisterProvider = () => import(/* webpackChunkName: "main" */ '../views/register/people/RegisterProvider')
const RegisterCustomer = () => import(/* webpackChunkName: "main" */ '../views/register/people/RegisterCustomer')

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
      children: [{
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
    },
    {
      path: 'fornecedor',
      name: 'CadastrarFornecedor',
      component: RegisterProvider,
    },
    {
      path: 'cliente',
      name: 'CadastrarCliente',
      component: RegisterCustomer,
    }]
  }],
  }],
})
