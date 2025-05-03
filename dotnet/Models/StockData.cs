public class StockData
{
    public int id { get; set; }
    public string symbol { get; set; } = null!;
    public DateTime record_date { get; set; }
    public decimal _open { get; set; }
    public decimal _high { get; set; }
    public decimal _low { get; set; }
    public decimal _close { get; set; }
    public long _volume { get; set; }
}