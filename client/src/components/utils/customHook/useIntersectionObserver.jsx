import React, { useState, useEffect } from 'react'

function useIntersectionObserver(targetRef, root = null, threshold = 0.5, rootMargin = '0px') {
    const [entry, setEntry] = useState(null);

    const isIntersecting = entry?.isIntersecting;

    const updateEntry = (entries) => {
        const [entry] = entries;

        setEntry(entry);
    };

    useEffect(() => {
        const target = targetRef.current;

        // 만약 겹치는 부분이 있다면? 이미 있다는 것이기에, 또한 타겟이 없으면? 실행하면 안되기에 리턴한다
        if (isIntersecting || !target) return;

        const observer = new IntersectionObserver(updateEntry, { threshold, root, rootMargin });

        observer.observe(target);

        return () => { observer.disconnect(); }            
    }, [targetRef, threshold, root, rootMargin]);

    return entry;
}

export default useIntersectionObserver;