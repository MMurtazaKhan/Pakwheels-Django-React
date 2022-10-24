import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom'
import { createAd } from '../actions/adActions';

function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const adCreate = useSelector(state => state.adCreate)
  const {ad} = adCreate

  const logoutHandler = () => {
    dispatch(logout())
  }

  const createAdHandler = () => {
    navigate(`/ad/create`)
  }
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/' >
        <Navbar.Brand>CarShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/products' >
            <Nav.Link >Products</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/cart' >
            <Nav.Link >Cart</Nav.Link>
            </LinkContainer>
            
      
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item  onClick={logoutHandler} >Log Out</NavDropdown.Item>
                </NavDropdown>
              ) :
               (
                <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
               )}

               {
                userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin'>
                <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/ads'>
                    <NavDropdown.Item>Ads</NavDropdown.Item>
                </LinkContainer>

                
                </NavDropdown> )
               }
              

               <Button onClick={createAdHandler} disabled={!userInfo} variant='success' className='text-right'>Create Ad</Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;