import React,{Children,cloneElement,isValidElement} from 'react';
import {View,Text} from 'react-native'

export const BackgroundImage=({children})=>{

  return(
    <View> 
      {Children.map(children,(child)=>{
if(!isValidElement(child)) return null;

return cloneElement(child,{
...child.props,
});
})}

    </View>
  )
}