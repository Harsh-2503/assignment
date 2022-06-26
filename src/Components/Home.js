import React, { useEffect,useCallback,useRef } from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ButtonAppBar from './Navbar';
import { useSelector } from 'react-redux';



const columns = [
    { id: 'picture', label: 'image', minWidth: 170},
    { id: 'gender', label: 'Gender', minWidth: 170 },
    { id: "name", label: 'Name', minWidth: 100 },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'cell',
      label: 'Cell',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: "email", label: 'Email', minWidth: 100 },
  ];



export default function Home() {
    const observer = useRef()
    const {detector} = useSelector(state=>state.verifier)
console.log(detector)

    const [data,setData] = useState([])
    const [page, setPage] = React.useState(0);
      const [loading, setLoading] = useState(true);
    const [offset,setOffset] = useState(15)





    const lastElement = useCallback(node=>{
        if(loading) return
        if(observer.current){
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(enteries=>{
            if(enteries[0].isIntersecting){
                console.log('visible')
                // setOffset(offset+10)
                setPage(page+1)
            }

        })
        if(node){
            observer.current.observe(node)
        }
        console.log(node)
    },[loading])

    
useEffect(()=>{
    setLoading(true)
    const interval = setTimeout(()=>{
        fetch(`https://randomuser.me/api/?results=`+offset)
        .then((results) => {
            if(results.ok){
                return results.json();
            }
            throw new Error('Oops Something went wrong !')

          })
          .then((data) => {
            const tempArr = data['results']

            setData(oldtempArr =>[...oldtempArr,...tempArr])
            setLoading(false)
            console.log(data['results']);

          }).catch((error)=>{
            console.log(error)
          });
    },1000)
    },[page]);





  return (
    <>
    <ButtonAppBar></ButtonAppBar>
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((row,index) => {
                console.log(data.length)
                if(data.length === index+1){
                    return (
                        <TableRow hover role="checkbox" ref={lastElement} tabIndex={-1} key={index}>
                          {columns.map((column,index) => {
                            const value = row[column.id];
                           
                         
                              return (
                            
                                  <TableCell key={index} align={column.align}>
                                      {column.id ==='picture'?<img src={value["thumbnail"]}/>:
                                      column.id ==='name'?value['first']+' '+value['last']
                                      // hola(column.align,index,column.id,value)
                                      :
                                    column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                
                                )
                              
                            
                          })}
                        </TableRow>
                      );

                }
                else{ return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                      {columns.map((column,index) => {
                        const value = row[column.id];
                       
                     
                          return (
                        
                              <TableCell key={index} align={column.align}>
                                  {column.id ==='picture'?<img src={value["thumbnail"]}/>:
                                  column.id ==='name'?value['first']+' '+value['last']
                                  // hola(column.align,index,column.id,value)
                                  :
                                column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            
                            )
                          
                        
                      })}
                    
                    
                    </TableRow>
                  );

                }
              })}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
             {loading===true?
             <Stack spacing={1}>

                   <Skeleton variant="rectangular" animation='wave' width={40} height={40} />
                   <Skeleton variant="text" />
                    </Stack>:false}   
    </>
  )
}
