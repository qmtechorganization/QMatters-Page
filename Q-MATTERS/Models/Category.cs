using System;
using System.Collections.Generic;

namespace Q_MATTERS.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<News> News { get; set; } = new List<News>();

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();
}
