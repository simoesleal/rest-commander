<template>
	<div class="register-employee">
		<page-title icon="fas fa-user-tie" main="Cadastrar Funcionário"></page-title>
		<b-form>			
			<b-form-group
				id="informacoes-basicas"
				label="Informações básicas"
				description="*Campos obrigatórios">
					<label>Código*</label>
					<b-form-input class="mb-2" v-model="funcionario.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
					<label>Nome*</label>
					<b-form-input class="mb-2" v-model="funcionario.nome" required type="text" placeholder="Exemplo: Antonio Neto"></b-form-input>
					<label>Login*</label>
					<b-form-input class="mb-2" v-model="funcionario.login" required type="text" placeholder="Exemplo: simoesleal"></b-form-input>
					<label>Senha*</label>
					<b-form-input class="mb-2" v-model="funcionario.senha" required type="password"></b-form-input>
			</b-form-group>
			<b-form-group
				id="informacoes-pessoais"
				label="Informações pessoais"
				description="*Campos obrigatórios"
			>
				<label>CPF*</label>
				<b-form-input class="mb-2" v-model="funcionario.cpf" required type="number" placeholder="Exemplo: 000.111.222-33"></b-form-input>
				<label>Data Nascimento*</label>
				<b-form-input class="mb-2" v-model="funcionario.dataNascimento" required type="date" placeholder="Exemplo: 01/02/1993"></b-form-input>
				<label>Função</label>
				<b-form-input class="mb-2" v-model="funcionario.funcao" required type="text" placeholder="Exemplo: Garçom"></b-form-input>
				<label>E-mail</label>
				<b-form-input class="mb-2" v-model="funcionario.email" required type="email" placeholder="Exemplo: antonio@mail.com"></b-form-input>
				<label>Telefone*</label>
				<b-form-input class="mb-2" v-model="funcionario.telefone" required type="tel" placeholder="Exemplo: +55 (45) 3025-1144"></b-form-input>
				<label>Celular</label>
				<b-form-input class="mb-2" v-model="funcionario.celular" required type="tel" placeholder="Exemplo: +55 (45) 98404-5443"></b-form-input>
			</b-form-group>
		
			<b-form-group
				id="informacoes-endereco"
				label="Informações de endereço"
				description="*Campos obrigatórios"
			>
				<label>CEP*</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.cep" required type="text" placeholder="Exemplo: 85858-082"></b-form-input>
				<label>Rua*</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.rua" required type="text" placeholder="Exemplo: Av. Brasil"></b-form-input>
				<label>Número*</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.numero" required type="number" placeholder="Exemplo: 1337"></b-form-input>
				<label>Bairro*</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.bairro" required type="text" placeholder="Exemplo: Jardim Central."></b-form-input>
				<label>Complemento</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.complemento" type="text" placeholder="Exemplo: casa."></b-form-input>
				<label>Pais</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.pais" type="text" placeholder="Exemplo: Brasil."></b-form-input>
				<label>Estado</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.uf" type="text" placeholder="Exemplo: Paraná."></b-form-input>
				<label>Cidade</label>
				<b-form-input class="mb-2" v-model="funcionario.logradouro.cidade" type="text" placeholder="Exemplo: Foz do Iguaçu."></b-form-input>
			</b-form-group>

			<b-button class="mr-5" block  type="submit" variant="primary">Salvar</b-button>
    </b-form>

		<div class="d-flex justify-content-start m-3 mt-5">
			<router-link :to="{ name: 'ConsultarFuncionarios'}">
				<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
				<div class="text-uppercase font-300">Voltar</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
	name: 'CadastroEmpregado',
	components: {
		'page-title': PageTitle
	},
	data() {
		return {
			funcionario: {
				id: 0,
				nome: '',
				login: '',
				senha: '',
				status: false,
				cpf: '',
				dataNascimento: '',
				funcao: '',
				email: '',
				telefone: '',
				celular: '',
				logradouro: {
					cep: '',
					rua: '',
					numero: '',
					complemento: '',
					bairro: '',
					pais: '',
					uf: '',
					cidade: ''
				}
			}
		}		
	},
	computed: {
		state() {
			return this.funcionio.name.length >= 4 ? true : false
		},
		invalidFeedback() {
			if (this.funcionio.name.length > 4) {
				return ''
			} else if (this.name.length > 0) {
				return 'Campo obrigatório'
			} else {
				return 'Campo obrigatório'
			}
		},
		validFeedback() {
			return this.state === true
		}
	},
}
</script>

<style>
	.btn-cancelar {
		text-decoration: none;
	}
</style>