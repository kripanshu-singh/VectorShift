from fastapi import APIRouter, Request
from .services import is_dag

router = APIRouter()

@router.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    body = await request.json()
    nodes = body.get('nodes', [])
    edges = body.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    dag = is_dag(nodes, edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag
    }
