import { Input, Modal, Table } from 'antd';
import { useState } from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';


function AntTable() {

    const [isEditing, setIsEditing] = useState(false)
    const [editingMovie, setEditingMovie] = useState(null)
   
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const [dataSource, setDataSource] = useState([
        {
            title: "Pitch Perfect",
            genre: "Comedy",
            stock: 37,
            rate: 7.2
          },
          {
            title: "Sympathy for the Devil",
            genre: "Documentary",
            stock: 10,
            rate: 4.8
          },
          {
            title: "Pawn",
            genre: "Thriller",
            stock: 43,
            rate: 5
          },
          {
            title: "Busting",
            genre: "Drama",
            stock: 5,
            rate: 8.5
          },
          {
            title: "Mystery Men",
            genre: "Action",
            stock: 45,
            rate: 2.4
          },
          {
            title: "Kadosh",
            genre: "Drama",
            stock: 15,
            rate: 3.3
          },
          {
            title: "Minuscule: Valley of the Lost Ants (Minuscule - La vallée des fourmis perdues)",
            genre: "Adventure",
            stock: 26,
            rate: 6.4
          },
          {
            title: "Batman",
            genre: "Action",
            stock: 36,
            rate: 8.6
          },
          {
            title: "Johnny Be Good",
            genre: "Comedy",
            stock: 41,
            rate: 9.9
          },
          {
            title: "Battle for Brooklyn",
            genre: "Documentary",
            stock: 41,
            rate: 6.9
          },
          {
            title: "Street Fighter: Assassin's Fist",
            genre: "Action",
            stock: 30,
            rate: 5.5
          },
          {
            title: "Combat Girls (Kriegerin)",
            genre: "Drama",
            stock: 39,
            rate: 7.6
          },
          {
            title: "To Faro (Mein Freund aus Faro)",
            genre: "Drama",
            stock: 49,
            rate: 2.9
          },
          {
            title: "Mother and Child",
            genre: "Drama",
            stock: 34,
            rate: 7.8
          },
          {
            title: "Raven, The",
            genre: "Horror",
            stock: 24,
            rate: 6.3
          },
          {
            title: "Jekyll + Hyde",
            genre: "Thriller",
            stock: 26,
            rate: 7
          },
          {
            title: "Getting Go, the Go Doc Project",
            genre: "Drama",
            stock: 6,
            rate: 1.9
          },
          {
            title: "Three Guys Named Mike",
            genre: "Comedy",
            stock: 25,
            rate: 9
          },
          {
            title: "Darjeeling Limited, The",
            genre: "Adventure",
            stock: 20,
            rate: 9.6
          },
          {
            title: "Karen Cries on the Bus",
            genre: "Drama",
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
    
    return ( 
        <div className="antTable">
            
            <Table
                columns={columns}
                dataSource={dataSource}
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