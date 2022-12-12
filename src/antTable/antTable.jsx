import { Input, Modal, Select, Switch, Table } from 'antd';
import { useState } from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';


function AntTable() {

    const [sortAscending, setSortAscending] = useState(true)

    const [isEditing, setIsEditing] = useState(false)
    const [editingMovie, setEditingMovie] = useState(null)
   
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const [dataSource, setDataSource] = useState([
      {
          title: "Pitch Perfect",
          genre: "Comedy",
          release: '05-10-2012',
          stock: 37,
          rate: 7.2
        },
        {
          title: "Sympathy for the Devil",
          genre: "Documentary",
          release: '06-12-1968',
          stock: 10,
          rate: 4.8
        },
        {
          title: "Pawn",
          genre: "Thriller",
          release: '19-09-2013',
          stock: 43,
          rate: 5
        },
        {
          title: "Busting",
          genre: "Drama",
          release: '27-02-1974',
          stock: 5,
          rate: 8.5
        },
        {
          title: "Mystery Men",
          genre: "Action",
          release: '06-08-1999',
          stock: 45,
          rate: 2.4
        },
        {
          title: "Kadosh",
          genre: "Drama",
          release: '01-09-1999',
          stock: 15,
          rate: 3.3
        },
        {
          title: "Minuscule: Valley of the Lost Ants (Minuscule - La vallée des fourmis perdues)",
          genre: "Adventure",
          release: '29-01-2014',
          stock: 26,
          rate: 6.4
        },
        {
          title: "Batman",
          genre: "Action",
          release: '04-03-2022',
          stock: 36,
          rate: 8.6
        },
        {
          title: "Johnny Be Good",
          genre: "Comedy",
          release: '25-03-1988',
          stock: 41,
          rate: 9.9
        },
        {
          title: "Battle for Brooklyn",
          genre: "Documentary",
          release: '30-04-2011',
          stock: 41,
          rate: 6.9
        },
        {
          title: "Street Fighter: Assassin's Fist",
          genre: "Action",
          release: '23-05-2014',
          stock: 30,
          rate: 5.5
        },
        {
          title: "Combat Girls (Kriegerin)",
          genre: "Drama",
          release: '19-01-2012',
          stock: 39,
          rate: 7.6
        },
        {
          title: "To Faro (Mein Freund aus Faro)",
          genre: "Drama",
          release: '30-10-2008',
          stock: 49,
          rate: 2.9
        },
        {
          title: "Mother and Child",
          genre: "Drama",
          release: '07-05-2010',
          stock: 34,
          rate: 7.8
        },
        {
          title: "Raven, The",
          genre: "Horror",
          release: '18-05-2012',
          stock: 24,
          rate: 6.3
        },
        {
          title: "Jekyll + Hyde",
          genre: "Thriller",
          release: '07-11-2006',
          stock: 26,
          rate: 7
        },
        {
          title: "Getting Go, the Go Doc Project",
          genre: "Drama",
          release: '04-03-2013',
          stock: 6,
          rate: 1.9
        },
        {
          title: "Three Guys Named Mike",
          genre: "Comedy",
          release: '01-03-1951',
          stock: 25,
          rate: 9
        },
        {
          title: "Darjeeling Limited, The",
          genre: "Adventure",
          release: '26-10-2007',
          stock: 20,
          rate: 9.6
        },
        {
          title: "Karen Cries on the Bus",
          genre: "Drama",
          release: '13-05-2011',
          stock: 45,
          rate: 3.6
        }
      ])

    const columns = [
       
        {
          title: "Title",
          dataIndex: "title",
          sorter: (a, b)=>{
            return a.title > b.title?1:a.title === b.title?0:-1
          }
        },
        {
          title: "Genre",
          dataIndex: "genre",
          sorter: (a, b)=>{
            return a.genre > b.genre?1:a.genre === b.genre?0:-1
          }
        },
        {
          title: 'Released',
          dataIndex: 'release'
        },
        {
          title: "Stock",
          dataIndex: "stock",
          sorter: (a, b)=>{
            return a.stock - b.stock
          }
        },
        {
          title: "Rate",
          dataIndex: "rate",
          sorter: (a, b)=>{
            return a.rate - b.rate
          }
        },
        {
          title: "Actions",
          render: (record)=>{
            return <>
                <EditOutlined 
                    onClick={()=>{
                        onEdit(record)
                    }}/>
                <DeleteOutlined 
                    onClick={()=>{
                        onDelete(record)
                    }}
                    style={{ color: 'red', marginLeft: 12}}/>
            </>
          }
        }
      ]

      const onEdit = (record)=>{
        setIsEditing(true)
        setEditingMovie({...record})
      }

      const resetEditing =()=>{
        setIsEditing(false)
        setEditingMovie(null)
      }
    
      const onDelete = (record)=>{

        Modal.confirm({
            title: 'Are you sure, you want to delete this movie record ?',
            okText: 'Yes',
            okType: 'danger',
            onOk: ()=>{

                setDataSource((pre)=>{
                    return pre.filter((movie)=>movie !== record)
                })
            }
        })

      }

      const onSorterChange = (selectedSorter)=>{
        const sortedDataSource = [...dataSource]
        if(selectedSorter === 'title'){
            sortedDataSource.sort((a, b)=>a.title>b.title?1:a.title === b.title?0:-1)
        }else if(selectedSorter === 'genre'){
            sortedDataSource.sort((a, b)=>a.genre>b.genre?1:a.genre === b.genre?0:-1)
        }else if(selectedSorter === 'stock'){
            sortedDataSource.sort((a,b)=>a.stock - b.stock)
        }else if(selectedSorter === 'rate'){
            sortedDataSource.sort((a,b)=>a.rate - b.rate)
        }
        setDataSource(sortedDataSource)
      }

      const updatedDataSource = sortAscending?[...dataSource]:[...dataSource].reverse()
    
    return ( 
        <div className="antTable">
                 <div style={{marginBottom: 30, display: 'flex', gap: 8, alignItems: 'center'}}>
                <span style={{marginRight: 10}}>Sort by Column : </span>
                <Select onChange={onSorterChange} placeholder='Select Column'>
                    <Select.Option value='title'>Title</Select.Option>
                    <Select.Option value='genre'>Genre</Select.Option>
                    <Select.Option value='stock'>Stock</Select.Option>
                    <Select.Option value='rate'>Rate</Select.Option>
                </Select>
                <Switch checkedChildren='Asc' unCheckedChildren='Desc' defaultChecked={sortAscending} onChange={setSortAscending}></Switch>
            </div>
            
            <Table
                columns={columns}
                dataSource={updatedDataSource}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    onChange: (page, pageSize)=>{
                        setPage(page)
                        setPageSize(pageSize)
                    }
                }}
            />
            <Modal
                title= 'Edit Movie'
                visible={isEditing}
                okText= 'Save'
                onCancel={()=>{
                    resetEditing()
                }}
                onOk={()=>{
                    setDataSource((pre)=>{
                        return pre.map((movie)=>{
                            if (movie.id === editingMovie.id){
                                return editingMovie
                            }else{
                                return movie
                            }
                        })
                    })
                    resetEditing()
                }}>

                <Input value={editingMovie?.title}
                       onChange={(e)=>{
                        setEditingMovie((pre)=>{
                            return {...pre, title: e.target.value}
                        })
                       }}/>
                <Input value={editingMovie?.genre}
                       onChange={(e)=>{
                        setEditingMovie((pre)=>{
                            return {...pre, genre: e.target.value}
                        })
                       }}/>
                <Input value={editingMovie?.stock}
                       onChange={(e)=>{
                        setEditingMovie((pre)=>{
                            return {...pre, stock: e.target.value}
                        })
                       }}/>
                <Input value={editingMovie?.rate}
                       onChange={(e)=>{
                        setEditingMovie((pre)=>{
                            return {...pre, rate: e.target.value}
                        })
                       }}/>

            </Modal>
        </div>
     );
}

export default AntTable;
