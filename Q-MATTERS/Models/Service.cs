using System;
using System.Collections.Generic;

namespace Q_MATTERS.Models;

public partial class Service
{
    public int Id { get; set; }

    public string Servcie { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Icon { get; set; } = null!;

    public int Idcategory { get; set; }

    public virtual Category IdcategoryNavigation { get; set; } = null!;
}
