
function LogIn()
{
    return(
        <div className="login_container">
        <form>
        <div>
        <label>Username or Email</label>
        <input type="text"></input>
        <input type='password'></input>
        <input value='Log In' type='submit'></input>
        </div>
        </form>
        </div>
    )
}

export default LogIn;