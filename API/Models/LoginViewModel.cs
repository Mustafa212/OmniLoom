using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API;

public class LoginViewModel
{
  public bool IsAdmin { get; set; }

  [Required(ErrorMessage = "Username or Email is required")]
  [MaxLength(20, ErrorMessage = "Max 20 Characters allowed")]
  [DisplayName("Username or Email")]
  public string UserNameOrEmail { get; set; }

  [Required(ErrorMessage = "Password is required")]
  [StringLength(20, MinimumLength = 5, ErrorMessage = "Min 5 or Max 20 Characters allowed")]
  [DataType(DataType.Password)]
  public string Password { get; set; }
}


