<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <the-header 
			title="Rest Commander" 
			:hideToggle="false"
			:hideUserDropdown="false">
		</the-header>
		<the-menu></the-menu>
		<the-content></the-content>
		<the-footer></the-footer>
  </div>
</template>

<script>

import TheHeader from './components/template/TheHeader'
import TheMenu from './components/template/TheMenu'
import TheContent from './components/template/TheContent'
import TheFooter from './components/template/TheFooter'
import { mapState } from 'vuex'

export default {
	name: "App",
	components: {
		'the-header': TheHeader,
		'the-content': TheContent,
		'the-menu': TheMenu,
		'the-footer': TheFooter
	},
	computed: mapState(['isMenuVisible'])
}
</script>

<style>
  * {
    font-family: "Lato", sans-serif;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;

		grid-template-areas:  
			"header header"
			"menu content"
			"menu footer";
  }

	#app.hide-menu {
		grid-template-areas:  
				"header header"
				"content content"
				"footer footer"
	}

	.btn-voltar {
    color: #428bca;
  }

	.form-panel {
    flex: 1;
    background: #FFF;
    margin: 0px 10px;
    padding: 20px;
    border: 1px solid #AAA;
    border-radius: 5px;
		box-shadow: 1px 1px 3px grey;
  }
</style>