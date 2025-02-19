import axios from 'axios';

class WeatherIconDTO {
    constructor(main, description, icon) {
      this.temperature = temperature;
      this.humidity = humidity;
      this.description = description;
    }
  }

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '只允許 GET 請求' });
  }

  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=${WEATHER_API_KEY}&units=metric`
    );

    // 將 API 回應轉換為 DTO 格式
    const weatherData = new WeatherDTO(
      response.data.main.temp,
      response.data.main.humidity,
      response.data.weather[0].description
    );

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('獲取天氣數據時發生錯誤:', error);
    res.status(500).json({ message: '獲取天氣數據失敗' });
  }
}
