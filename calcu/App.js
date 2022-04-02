import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component{
    constructor(props){
      super(props)
      this.state ={
        display:'',
        result:''
      }
    } 
     
   handleOp(op){
     if(op === 'C'){
       this.setState({
         display:"",
         result:''
       })
     }else if(op ==='='){
       this.setState({
         display: this.state.result,
         result: ''
       })
        
     }else{
      const display  = this.state.display +op
      let result = this.state.result
        
      try{
        let Fixedopera = display.split('x').join('*')
          Fixedopera =Fixedopera.split('÷').join('/')
          Fixedopera =Fixedopera.split(',').join('.')
         
        result = new String(eval(Fixedopera)).toString()    
      }catch(e){} 

      this.setState({
        display,
        result
      })

     }
   }

     
  render(){ 
   const col1Buttons= [
     ['7','8','9'],
     ['6','5','4'],
     ['3','2','1'],
     [',','0','='],
   ]
    
   const Buttons = ['C','÷','x','+','-']
     
    return (
      <View style={styles.container}>
      <Text style={styles.display}> {this.state.display} </Text>
      <Text style={styles.result} > {this.state.result} </Text>
        
        <View style={styles.buttons}>
          
          <View style={styles.col1} >
            
            {col1Buttons.map( (line,ind) => 
              <View key={ind} style={styles.line}> 
               { line.map ( op =>  <TouchableOpacity   key={op} style={styles.btn} onPress={() => this.handleOp(op)} > 
                <Text style={styles.btnText}>
                 {op} 
                 </Text>
                </TouchableOpacity> )}

               </View> 
               )}
         
          </View>
          
          <View style={styles.col2} >
          { Buttons.map ( op =>  <TouchableOpacity key={op} style={styles.btn}  onPress={()=> this.handleOp(op)} > 
            <Text style={styles.btnText}> 
              {op}
             </Text>
            </TouchableOpacity> )}

          </View>
        
        </View>
    
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display:{
   flex:1,
   backgroundColor:'#fffFEF',
   fontSize:70,
   textAlign:'right',
   paddingTop:30,
   paddingRight:10
  },

  result:{
   flex:0.4,
   backgroundColor:'#F87676',
   fontSize:40,
   textAlign: 'right',
   paddingBottom:10,
   paddingRight:10
  },
  
  buttons:{
  flex:5,
  flexDirection:'row',
  },
  
  line:{
   flex:1,
   flexDirection:'row'
  },
  btn:{
  flex:1
  },

   btnText:{
     textAlign:'center',
     fontSize:50,
     justifyContent:'center',
     color:'white'
   },

  col1:{
    flex:3,
    backgroundColor:'black'
  },
  col2:{
    flex:1,
    backgroundColor:'blue',
    opacity:0.7
   
  }
});
