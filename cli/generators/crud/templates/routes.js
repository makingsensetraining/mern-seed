import <%= ucName %>Page from './components/<%= name %>/<%= ucName %>Page';
import <%= ucName %>AddPage from './components/<%= name %>/<%= ucName %>AddPage';
import <%= ucName %>EditPage from './components/<%= name %>/<%= ucName %>EditPage';
export default (
    <Route path='/app' component={App}>
      <Route path='/app/<%= pluralizedName %>' component={<%= ucName %>Page}/>
      <Route path='/app/<%= pluralizedName %>/add' component={<%= ucName %>AddPage}/>
      <Route path='/app/<%= pluralizedName %>/:id/edit' component={<%= ucName %>EditPage}/>
    </Route>
);;