using System;
using System.Collections.Generic;

namespace Q_MATTERS.Models;

public partial class News
{
    public int Id { get; set; }

    public bool Posted { get; set; }

    public string Text { get; set; } = null!;

    public string Userid { get; set; } = null!;

    public DateTime? DatePosted { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime? DateUpdated { get; set; }

    public int Idcategoy { get; set; }

    public virtual Category IdcategoyNavigation { get; set; } = null!;

    public virtual AspNetUser User { get; set; } = null!;
}
