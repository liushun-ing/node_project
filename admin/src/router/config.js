import Center from '../views/center/Center'
import Home from '../views/home/Home'
import UserAdd from '../views/user-manage/UserAdd'
import UserList from '../views/user-manage/UserList'
import NewsAdd from '../views/news-manage/NewsAdd'
import NewsList from '../views/news-manage/NewsList'
import NewsEdit from '../views/news-manage/NewsEdit'
import ProductAdd from '../views/product-manage/ProductAdd'
import ProductList from '../views/product-manage/ProductList'
import ProductEdit from '../views/product-manage/ProductEdit'
import NotFound from '../views/NotFound'

const routes = [
  {
    path: '/index',
    name: 'index',
    component: Home
  },
  {
    path: '/center',
    name: 'center',
    component: Center
  },
  {
    path: '/user-manage/adduser',
    component: UserAdd,
    requireAdmin: true
  },
  {
    path: '/user-manage/listuser',
    component: UserList,
    requireAdmin: true
  },
  {
    path: '/news-manage/addnews',
    component: NewsAdd
  },
  {
    path: '/news-manage/listnews',
    component: NewsList
  },
  {
    path: '/news-manage/editnews/:id',
    component: NewsEdit
  },
  {
    path: '/product-manage/addproduct',
    component: ProductAdd
  },
  {
    path: '/product-manage/listproduct',
    component: ProductList
  },
  {
    path: '/product-manage/editproduct/:id',
    component: ProductEdit
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default routes