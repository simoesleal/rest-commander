const treeData = [{
	text: 'Cadastros',
	state: { expanded: false }, 
	data: { icon: 'fas fa-cog', url:'Financeiro' },
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
		},
		{ text: 'Estrutural',
			data: { icon: 'fas fa-shapes', url:'CadastrosEstruturais' },
			children: [
				{
					text: 'Mesa',
					data: { 
					icon: 'fab fa-buromobelexperte',
					url: 'ConsultarMesas'	}
				},
				{
					text: 'Funcao',
					data: { 
					icon: 'fab fa-black-tie',
					url: 'ConsultarFuncoes'	}
				},
				/* {
					text: 'NCM',
					data: { 
					icon: 'fab fa-creative-commons-nc',
					url: 'ConsultarNCM'	}
				}, */
				/* {
					text: 'CEST',
					data: { 
					icon: 'fab fa-creative-commons-nc',
					url: 'ConsultarCEST'	}
				}, */
				/* {
					text: 'CST PIS/COFINS',
					data: { 
					icon: 'fab fa-creative-commons-nc',
					url: 'ConsultarCstPisCofins'	}
				}, */
				/* {
					text: 'CST/CSOSN',
					data: { 
					icon: 'fab fa-creative-commons-nc',
					url: 'ConsultarCstCsosn'	}
				}, */
				/* {
					text: 'CFOP',
					data: { 
					icon: 'fab fa-creative-commons-nc',
					url: 'ConsultarCfop'	}
				}, */
				{
					text: 'Moeda',
					data: { 
					icon: 'fas fa-money-bill-alt',
					url: 'ConsultarMoeda'	}
				},
				{
					text: 'Cotacao',
					data: { 
					icon: 'fas fa-money-bill-alt',
					url: 'ConsultarCotacao'	}
				}
			]
		},
		{ text: 'Financeiro',
			data: { icon: 'fas fa-coins', url:'CadastroFinanceiro' },
			children: [
				{
					text: 'Banco',
					data: { 
					icon: 'fas fa-university',
					url: 'ConsultarBanco'	}
				},
				{
					text: 'Conta Bancaria',
					data: { 
					icon: 'fas fa-piggy-bank',
					url: 'ConsultarContaBancaria'	}
				},
				{
					text: 'Formas de Pagamento',
					data: { 
					icon: 'fas fa-money-check-alt',
					url: 'ConsultarTipoPagamento'	}
				},
				{
					text: 'Tipo de Documentos',
					data: { 
					icon: 'far fa-file-alt',
					url: 'ConsultarTiposDocumento'	}
				},
			]
		},
		{ text: 'Estoque',
			data: { icon: 'fas fa-boxes', url:'CadastroEstoque' },
			children: [
				{
				text: 'Grupo de produtos',
				data: { 
					icon: 'fas fa-hamburger',
					url: 'ConsultarGrupoProdutos'	
				}
			}, {
				text: 'Unidades de Medida',
				data: {
					icon: 'fas fa-weight-hanging',
					url: 'ConsultarUnidadeMedida'
				}
			}, {
				text: 'Produtos',
				data: { 
					icon: 'fas fa-hamburger',
					url: 'ConsultarProdutos'	
				}
			}
			/* {
				text: 'Insumos',
				data: { 
				icon: 'fas fa-bread-slice',
				url: 'ConsultarInsumos'	}
			},
			{
				text: 'Grupo de insumo',
				data: { 
				icon: 'fas fa-bread-slice',
				url: 'ConsultarGrupoDeInsumos'	}
			}, */
			/* {
				text: 'Produtos',
				data: { 
				icon: 'fas fa-hamburger',
				url: 'Produtos'	}
			},
			{
				text: 'Grupo de produtos',
				data: { 
				icon: 'fas fa-hamburger',
				url: 'GrupoProduto'	}
			}, */			
			]
		},
	]
},
{
	text: 'PDV',
	state: { expanded: false },
	data: { icon: 'fas fa-cash-register', url:'Pdv' },
	children: [
		{
			text: 'Caixa',
			data: { 
			icon: 'fas fa-cash-register',
			url: 'Caixa'	}
		},
		{
			text: 'Mesas',
			data: { 
			icon: 'fab fa-buromobelexperte',
			url: 'MapaMesas'	}
		},
		{
			text: 'Novo Pedido',
			data: { 
			icon: 'far fa-edit',
			url: 'NovoPedido'	}
		}
	]
},
{
	text: 'Financeiro',
	state: { expanded: false },
	data: { icon: 'fas fa-coins', url:'Financeiro' },
	children: [
		{
			text: 'Contas à Pagar',
			data: { 
			icon: 'fas fa-file-invoice',
			url: 'ContasPagar' },
			children: [
				{
					text: 'Nova Duplicata a Pagar',
					data: { 
					icon: 'fas fa-copy',
					url: 'NovaContaPagar'	}
				},
				{
					text: 'Duplicatas a Pagar',
					data: { 
					icon: 'fas fa-copy',
					url: 'ConsultarParcelaPagar'	}
				}
			]
		},
		{
			text: 'Contas à Receber',
			data: { 
			icon: 'fas fa-file-invoice-dollar',
			url: 'ContasReceber'},
			children: [
				{
					text: 'Nova Duplicata a Receber',
					data: { 
					icon: 'fas fa-copy',
					url: 'NovaContaReceber'	}
				},
				{
					text: 'Duplicatas  a Receber',
					data: { 
					icon: 'fas fa-copy',
					url: 'ConsultarParcelaReceber'	}
				}
			]
		},
		{
			text: 'Relatórios',
			data: { 
			icon: 'far fa-file-pdf',
			url: 'relatorios'	}
		}
	]
},
{
	text: 'Estoque',
	state: { expanded: false },
	data: { icon: 'fas fa-warehouse', url:'Estoque' },
	children: [
		{
			text: 'Movimentações de Estoque',
			data: { 
			icon: 'fas fa-people-carry',
			url: 'movimentarEstoque'	}
		},
		{
			text: 'Fechamento Mensal',
			data: { 
			icon: 'far fa-calendar-times	',
			url: 'fechamentoEstoqueMensal'	}
		},
		{
			text: 'Relatórios',
			data: { 
			icon: 'far fa-file-pdf',
			url: 'relatorios'	}
		}
	]
},

]

export default treeData