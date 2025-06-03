namespace BoilerplateCombo.Models;

public class Researcher
{
    public int id { get; set; }
    public DateTime created_at { get; set; }
    public string name { get; set; }
    public int age { get; set; }
}

public class Researcher2
{
    public long id { get; set; }
    public DateTime created_at { get; set; }
    public string name { get; set; }
}

public class ResearcherMsSql
{
    public int id { get; set; }
    public DateTime created_at { get; set; }
    public string name { get; set; }
}

public class ResearchActivity
{
    public DateTime time { get; set; }
    public string researcher { get; set; }
    public string paper { get; set; }
    public string topic { get; set; }
    public string conference { get; set; }
    public string organization { get; set; }
    public int citations { get; set; }
}