import Vue from 'vue'
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components 
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('span', '❌'),
  },
  OpenIndicator: {
    render: createElement => createElement('span', '🔽'),
  },
});

// Register the component
Vue.component('v-select', vSelect)
