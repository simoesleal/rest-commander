const treeData = [{
	text: 'Cadastros',
	state: { expanded: false }, 
	children: [
		{ text: 'Geográfico',
			data: { icon: 'fas fa-globe-americas', url:'Cadastros' },
			children: [
				{
					text: 'Pais',
					data: { 
					icon: 'fas fa-flag',
					url: 'ConsultarPais'	}
				},
				{
					text: 'Estado',
					data: { 
					icon: 'fas fa-university',
					url: 'ConsultarEstado'	}
				},
				{
					text: 'Cidade',
					data: { 
					icon: 'fas fa-city',
					url: 'ConsultarCidade'	}
				},
			]
		},
		{
			text: 'Pessoas',
			data: { icon: 'fas fa-users', url:'CadastroPessoas' },
			children: [
				{
					text: 'Funcionário',
					data: { 
					icon: 'fas fa-user-tie',
					url: 'ConsultarFuncionarios'	} 
				},
				{
					text: 'Fornecedor',
					data: { 
					icon: 'fas fa-truck',
					url: 'ConsultarFornecedores'	} 
				},
				{
					text: 'Cliente',
					data: { 
					icon: 'fas fa-user-astronaut',
					url: 'ConsultarClientes'	} 
				},
			]
		}
	]
}]

export default treeData