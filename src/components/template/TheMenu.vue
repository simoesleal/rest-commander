<template>
	<aside v-show="isMenuVisible" class="menu">
		<tree :data="itens" ref="tree">
				<span class="tree-text" slot-scope="{ node }">
					<template v-if="!node.data.icon">
						{{ node.text }}
					</template>
					<template v-else>
						<i :class="node.data.icon"></i>
						{{ node.text }}
					</template>
				</span>
		</tree>
	</aside>
</template>


<script>

import { mapState } from 'vuex'
import nav from '../../router/_nav'
import LiquorTree from 'liquor-tree'

export default {
	name: 'Menu',
	data() {
		return {
			itens: nav,
		}
	},
	components: {
		tree: LiquorTree
  },
	computed: mapState(['isMenuVisible']),
	methods: {
		onNodeSelect(node) {
			this.$router.push({name: node.data.url})
		}
	},
	mounted() {
		this.$refs.tree.$on('node:selected', this.onNodeSelect)
	}
}
</script>

<style>
	.menu {
		grid-area: menu;
		background: linear-gradient(to right, #232526, #414345);
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.tree-anchor span,
	.tree-anchor span:hover {
		color: #fff;
		text-decoration: none;
	} 

	.menu .tree-node.selected > .tree-content,
	.menu .tree-node > .tree-content:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.tree-arrow.has-child {
		filter: brightness(2);
	}
	
</style> 