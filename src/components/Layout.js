import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, AppBar, Toolbar } from '@material-ui/core'



const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
        },
        root: {
            display: 'flex',
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
        },
        appBar: {
        },
        title:{
            flexGrow: 1,
            fontWeight: 700
        },
        logo:{
            maxWidth: 50,
            padding: 10,
            paddingLeft: 80,
        },
        navText:{
            paddingRight: 60,
            paddingLeft: 60,
            fontWeight: 400
        },
        userName:{
            paddingRight: 60,
            paddingLeft: 60,
            fontWeight: 550
        },
        toolbarHeight: {
        },
      toolbar: theme.mixins.toolbar
    }
  })

  export default function Layout({ children }) {
    const classes = useStyles()
  
  
    return (
      <div className={classes.root}>
        {/* app bar */}
        <AppBar 
          position="fixed" 
          className={classes.appBar}
          elevation={0}
          color="primary"
        >
          <Toolbar className={classes.toolbarHeight}>
            <img src='Yummi.svg' alt="logo" className={classes.logo}/>
            <Typography className={classes.title} variant='h4' color='textPrimary'>
                         Yummi
                     </Typography>
                     <div>
                         <Typography variant='h4' color='textPrimary' className={classes.userName}>
                             Hello Elijah!
                         </Typography>
                         <Typography variant='subtitle1' color='textPrimary' className={classes.navText} align='center'>
                            McDonalds
                         </Typography>
                     </div>
                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
                         Upload
                     </Typography>
                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
                         Manage
                     </Typography>
                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
                         Dashboard
                     </Typography>
          </Toolbar>
        </AppBar>
          
        
  
        {/* main content */}
        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          { children }
        </div>
      </div>
    )
  }


// import React from 'react'
// import { makeStyles } from '@material-ui/core'
// import { Typography, AppBar, Toolbar } from '@material-ui/core'



// const useStyles = makeStyles((theme)=>{
//     return {
//         page: {
//             background: '#112232', //'rgba(17, 34, 50, .1)'
//             width: '100%'
//         },
        
//         appbar: {
//         },
//         title:{
//             flexGrow: 1
//         },
//         logo:{
//             maxWidth: 50,
//             padding: 10,
//             paddingLeft: 80            
//         },
//         navText:{
//             paddingRight: 60,
//             paddingLeft: 60,
//             fontWeight: 400
//         },
//         userName:{
//             paddingRight: 60,
//             paddingLeft: 60,
//             fontWeight: 550
//         },
//         toolbar: theme.mixins.toolbar,
//     }
// })


// export default function Layout({ children }) {
//     const classes = useStyles()
//     return (
//         <div>
//             {/* NAV BAR */}
//             <AppBar position='fixed' color='transparent' elevation={1}>
//                 <Toolbar>
//                     <img src='YummiLogo.png' alt="logo" className={classes.logo}/>
//                     <Typography className={classes.title} variant='h2' color='textPrimary'>
//                         Yummi
//                     </Typography>
//                     <div>
//                         <Typography variant='h4' color='textPrimary' className={classes.userName}>
//                             Hello Elijah!
//                         </Typography>
//                         <Typography variant='subtitle1' color='textPrimary' className={classes.navText} align='center'>
//                             McDonalds
//                         </Typography>
//                     </div>
//                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
//                         Upload
//                     </Typography>
//                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
//                         Manage
//                     </Typography>
//                     <Typography variant='h4' color='textPrimary' className={classes.navText}>
//                         Dashboard
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             pog
//             <div className = {classes.page}>
//             <div className={classes.toolbar}></div>
//                 { children }
//             </div>
//         </div>
//     )
// }
