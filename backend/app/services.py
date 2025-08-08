def is_dag(nodes, edges):
    if not nodes:
        return True
    
    graph = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}

    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in graph and target in graph:
            graph[source].append(target)
            in_degree[target] += 1

    queue = [node['id'] for node in nodes if in_degree[node['id']] == 0]
    
    count = 0
    while queue:
        node_id = queue.pop(0)
        count += 1
        
        if node_id in graph:
            for neighbor in graph[node_id]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
    
    return count == len(nodes)
