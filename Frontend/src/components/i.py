def rearrangeArray(nums):
    p=[]
    n=[]
    for i in nums:
        if i>=0:
            p.append(i)
        else:
            n.append(i)
    
    a=[]
    for i in range(len(p)):
        a.append(p[i])
        a.append(n[i])
    return a

nums = [3,1,-2,-5,2,-4]

print(rearrangeArray(nums))