import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';

async function loginUser(credentials) {
    return fetch('http://localhost/projects/annihilation_api/login.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'Email='+credentials.email+'&Password='+credentials.password,
    }).then(data => data.json())
}

const GameLogin = ({handleLoading, handleGameLoginState}) => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginBtn, setLoginBtn] = useState("Login");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async e => {
        // handleLoading(true);
        setLoginBtn("Logging...");
        e.preventDefault();
        const loginResponse = await loginUser({
          email,
          password
        });
        if(loginResponse.status==200){
            setErrorMessage(null);
            localStorage.setItem('UserData', JSON.stringify(loginResponse.data));
            handleGameLoginState(true);
            setShowModal(false);
            // handleLoading(false);
            setLoginBtn("Login");
        }else{
            setShowModal(true);
            // handleLoading(false);
            setLoginBtn("Login");
            setErrorMessage(loginResponse.error);
            handleGameLoginState(false);
        }
        // console.log(loginResponse);
        //setToken(token);
      }

    return (
        <div>
            <button className='btn btn-primary' onClick={()=>setShowModal(true)} > Login With Game</button>

            <Modal show={showModal} onHide={()=>setShowModal(false)} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title className='mb-0'>Game Login</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                <Modal.Body>
                    {
                    (errorMessage===null)? "":<div className='alert alert-danger alert-dismissible pt-0 pb-0'><button type="button" className="btn-close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" className='icon'>&times;</span></button><b>{errorMessage}</b></div> 
                    }
                    <div className='form-group'>
                        <label>Email</label>
                        <input className='form-control' type="text" onChange={e => setEmail(e.target.value)} />
                        <span className="form-control-bg"></span>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
                        <span className="form-control-bg"></span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ ()=>setShowModal(false) } className="btn">
                        Close
                    </Button>
                    <button type='submit' className='btn btn-primary'>{loginBtn}</button>
                </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default GameLogin;