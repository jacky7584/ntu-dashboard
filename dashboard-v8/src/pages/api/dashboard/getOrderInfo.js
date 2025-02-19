import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // 讀取 public 目錄下的 JSON 檔案
        const jsonPath = path.join(process.cwd(), 'public', 'data', 'backend_statistics.json');
        const fileContents = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(fileContents);

        // 回傳資料
        res.status(200).json(data);
    } catch (error) {
        console.error('Error reading order data:', error);
        res.status(500).json({ message: 'Error reading order data' });
    }
}
