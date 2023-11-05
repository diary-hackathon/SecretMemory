import React, { useState, useEffect, ChangeEvent } from "react";

const ChangeStateDiary = () => {
    const [newBody, setNewBody] = useState("");

    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newBody = e.target.value;
        setNewBody(newBody);
    };

    return (
        <div>
        <textarea
            value={newBody}
            onChange={handleBodyChange}
            placeholder="新しい本文"
        />
        <button type="submit">保存</button>
        </div>
    );
};

export default ChangeStateDiary