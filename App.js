import React, {useState} from 'react';
import {TextInput,SafeAreaView,StyleSheet,View,Text,TouchableHighlight} from 'react-native';
import Display from './components/display';
import Btn from './components/botao';

let estados = {valorTela:'',resultado:0,operado:false,ponto:false}

export default function App()
{
	const [vtela, setVtela] = useState(estados.valorTela)
	const [vres, setVres] = useState(estados.resultado)
	const addDigito=(d)=>{
		if ((d=='+' || d=='-' || d=='*') && estados.operado){
			estados.valorTela = estados.resultado
			estados.resultado = 0
	  }
		estados.valorTela = estados.valorTela + d
		setVtela(estados.valorTela)
		setVres(estados.resultado)
		estados.operado = false
		
	}
	const limparTela=()=>{
		estados = {valorTela:'',resultado:0,operado:false,ponto:false}
		setVtela(estados.vtela)
		setVres(estados.vres)
	}
	
	const opera=(d)=>{
		if(d=='AC')
		{
			limparTela()
			return
		}
		if(d=='BS')
		{
			estados.valorTela = vtela.substring(0,(vtela.length-1))
			setVtela(estados.valorTela)
			return
		}
		try
		{
			estados.resultado = eval(estados.valorTela)
			estados.operado = true
			setVres(estados.resultado)
		}
		catch
		{
			estados.resultado = 'ERRO'
			estados.operado = true
			setVres(estados.resultado)	
		}
	}
	return(
		<SafeAreaView style={estilos.container}>
      <Text style={estilos.gambs}> </Text>
			<Display valor={vtela} res={vres} />
			<View style={estilos.botoes}>
				<Btn label='AC' limpa aoClicar={()=>{opera('AC')}}></Btn>
				<Btn label='(' aoClicar={()=>{addDigito('(')}}></Btn>
				<Btn label=')' aoClicar={()=>{addDigito(')')}}></Btn>
				<Btn label='/' oper aoClicar={()=>{addDigito('/')}}></Btn>
				<Btn label='7' aoClicar={()=>{addDigito('7')}}></Btn>
				<Btn label='8' aoClicar={()=>{addDigito('8')}}></Btn>
				<Btn label='9' aoClicar={()=>{addDigito('9')}}></Btn>
				<Btn label='*' oper aoClicar={()=>{addDigito('*')}}></Btn>
				<Btn label='4' aoClicar={()=>{addDigito('4')}}></Btn>
				<Btn label='5' aoClicar={()=>{addDigito('5')}}></Btn>
				<Btn label='6' aoClicar={()=>{addDigito('6')}}></Btn>
				<Btn label='-' oper aoClicar={()=>{addDigito('-')}}></Btn>
				<Btn label='1' aoClicar={()=>{addDigito('1')}}></Btn>
				<Btn label='2' aoClicar={()=>{addDigito('2')}}></Btn>
				<Btn label='3' aoClicar={()=>{addDigito('3')}}></Btn>
				<Btn label='+' oper aoClicar={()=>{addDigito('+')}}></Btn>
				<Btn label='0' aoClicar={()=>{addDigito('0')}}></Btn>
				<Btn label='.' aoClicar={()=>{addDigito('.')}}></Btn>
				<Btn label='<-' apaga aoClicar={()=>{opera('BS')}}></Btn>
				<Btn label='=' igual aoClicar={()=>{opera('=')}}></Btn>
			</View>
		</SafeAreaView>
	);
};

const estilos = StyleSheet.create
({
	container:{backgroundColor:'#fff' ,flex:1, justifyContent:'flex-start', alignItems:'center'},
	botoes:{flexDirection:'row', flexWrap:'wrap'},
  gambs:{fontSize:20}
});
