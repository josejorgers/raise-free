import React from 'react'
import './loading.css'
function WithLoading({loading, children}) {

    const loadingComp = 
        <div id='loading'>
            <img src="/loading.gif" alt=""/>
        </div>
    return loading ? loadingComp : children
}

export default WithLoading
