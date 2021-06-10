import {ThemeProvider, Button}  from 'react-native-elements';

export const theme =  {
    Button: {
        buttonStyle:{
            backgroundColor: '#36846b',
        },
        
        titleStyle:{

        }
          
    },

    Card:{
        containerStyle:{
            margin: 40,
            borderRadius: 15,
            borderColor: '#d68438',
            backgroundColor: "#f1b24b",
            
        
        },
        wrapperStyle: {
            fontSize: 30,
        },      
        
    },

    Divider:{
        style:{
            backgroundColor: '#36846b',
            height: 1,
        }
    },

    Text:{
        h4:{
           fontSize: 10,
        },

    }
}

export const login = {
    Input:{
        containerStyle:{
            borderColor: 'green',
            paddingRight: 100,
            paddingLeft: 100,
        }
    },

    Button: {
        buttonStyle:{
            backgroundColor: '#36846b',
            marginTop: 50,
            
        },
        containerStyle:{
            paddingRight: 100,
            paddingLeft: 100,
        }
    },
} 

