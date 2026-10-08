import { navigateTo } from '@/assets/navigate'
import classes from './Navbar.module.css'


export const Navbar = () => {


    return (
        <nav className={classes.navbar} id='navbar'>
            <div className={classes.leftSide}>
                <h1 onClick={() => navigateTo('hero')}>
                    jose-portfolio.dev
                </h1>
            </div>
            <div className={classes.rightSide}>
                <a onClick={() => navigateTo('about')}>About</a>
                <button className={classes.resume} onClick={() => navigateTo('contact')}>
                    Contact Me
                </button>
            </div>
               
            
        </nav>
    )
}