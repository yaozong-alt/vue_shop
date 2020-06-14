import Vue from 'vue'
import { Button,form,FormItem,Input,Message,Container,Aside,Main,Header,Menu,Submenu,
    MenuItem,MenuItemGroup,Col,RadioGroup,RadioButton,
    Breadcrumb,BreadcrumbItem,Card,Row,Table,TableColumn,Switch,Dialog,Pagination,MessageBox
    } from 'element-ui'

Vue.use(Button)
Vue.use(form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Col)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.prototype.$message=Message
Vue.prototype.$messageBox=MessageBox
